"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { gql, request } from "graphql-request"
import { format } from 'date-fns' // We will use this
import { DataTable } from "@/components/data-table"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { DropdownMenuItem } from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Users, UserCheck, UserX, Eye, Check, X, Mail, Loader2, TrendingUp } from "lucide-react"
import Link from "next/link"
import { useToast } from "@/components/ui/use-toast"
import { BulkActionBar } from "@/components/bulk-action-bar"

// Type for a single column, matching your DataTable component's interface
interface Column {
  key: string;
  label: string;
  sortable?: boolean;
  render?: (value: any, row: InstitutionUser) => React.ReactNode;
}

// Type Definitions for data
interface InstitutionUser {
  userId: string;
  name: string;
  email: string;
  profileImage: string | null;
  registrationDate: string;
  status: 'active' | 'pending' | 'revoked';
  averagePerformance: number;
  businessName?: string;
  tin?: string;
}
interface UserManagementStats {
  totalUsers: number;
  activeUsers: number;
  pendingUsers: number;
  averagePerformance: number;
}
interface UserManagementPageData {
  getUserManagementData: {
    stats: UserManagementStats;
    users: InstitutionUser[];
  };
}

interface UpdateUserStatusResponse {
  updateUserStatus: {
    userId: string;
    status: string;
  };
}

// GraphQL Queries & Mutations (no changes needed)
const GET_USER_MANAGEMENT_DATA = gql`
  query GetUserManagementData {
    getUserManagementData {
      stats { totalUsers, activeUsers, pendingUsers, averagePerformance }
      users { userId, name, email, profileImage, registrationDate, status, averagePerformance, businessName, tin }
    }
  }
`;
const UPDATE_USER_STATUS = gql`
  mutation UpdateUserStatus($input: UpdateUserStatusInput!) {
    updateUserStatus(input: $input) { userId, status }
  }
`;

const GQL_API_ENDPOINT = `${process.env.NEXT_PUBLIC_APP_URL}/api/graphql`;
const fetchUserManagementData = async (): Promise<UserManagementPageData> => {
  return request(GQL_API_ENDPOINT, GET_USER_MANAGEMENT_DATA);
};

export default function UserManagementPage() {
  const [selectedUsers, setSelectedUsers] = useState<InstitutionUser[]>([]);
  const queryClient = useQueryClient();
  const { toast } = useToast();

  const { data, isLoading, isError, error } = useQuery<UserManagementPageData>({
    queryKey: ['userManagement'],
    queryFn: fetchUserManagementData,
  });
  
  const userStatusMutation = useMutation({
    mutationFn: (variables: { userId: string, status: 'active' | 'revoked'}) => 
      request<UpdateUserStatusResponse>(GQL_API_ENDPOINT, UPDATE_USER_STATUS, { input: variables }),
    onSuccess: (data) => {
      toast({ title: "Success", description: `User status has been updated to ${data.updateUserStatus.status}.`});
      queryClient.invalidateQueries({ queryKey: ['userManagement'] });
      setSelectedUsers([]);
    },
    onError: (err: any) => {
      const errorMessage = err.response?.errors?.[0]?.message || "An unknown error occurred.";
      toast({ title: "Error", description: `Failed to update user status: ${errorMessage}`, variant: 'destructive'});
    }
  });

  const handleUpdateStatus = (userId: string, status: 'active' | 'revoked') => {
    userStatusMutation.mutate({ userId, status });
  }

  const handleBulkApprove = () => {
    selectedUsers.forEach(user => {
      if (user.status === 'pending') {
        handleUpdateStatus(user.userId, 'active');
      }
    });
  };
  const handleBulkReject = () => {
    selectedUsers.forEach(user => {
      if (user.status === 'pending') {
        handleUpdateStatus(user.userId, 'revoked');
      }
    });
  };

  const columns: Column[] = [
    {
      key: "name",
      label: "User",
      sortable: true,
      render: (_, row: InstitutionUser) => (
        <div className="flex items-center gap-3">
          <Avatar className="w-8 h-8">
            <AvatarImage src={row.profileImage || undefined} />
            <AvatarFallback>{row.name.split(" ").map((n: string) => n[0]).join("")}</AvatarFallback>
          </Avatar>
          <div>
            <p className="font-medium text-gray-900">{row.name}</p>
            <p className="text-sm text-gray-500">{row.email}</p>
          </div>
        </div>
      ),
    },
    {
      key: "businessName",
      label: "Business/Organization",
      sortable: true,
      render: (value: string, row: InstitutionUser) => (
        <div>
          <p className="font-medium text-gray-900">{value || 'N/A'}</p>
          <p className="text-sm text-gray-500">TIN: {row.tin || 'N/A'}</p>
        </div>
      ),
    },
    {
      key: "registrationDate",
      label: "Registration Date",
      sortable: true,
      // ✨ FIX: This render function is now defensive against invalid date values.
      render: (value: string) => {
        if (!value) {
          return <span className="text-gray-400">-</span>;
        }
        try {
          // Create a date object and check if it's valid
          const date = new Date(value);
          if (isNaN(date.getTime())) {
            return <span className="text-red-500">Invalid Date</span>;
          }
          return format(date, "MMMM d, yyyy");
        } catch (e) {
          return <span className="text-red-500">Error</span>;
        }
      },
    },
    {
      key: "status",
      label: "Status",
      sortable: true,
      render: (value: string) => (
        <Badge variant={value === "active" ? "default" : value === "pending" ? "secondary" : "destructive"} className="capitalize">
          {value}
        </Badge>
      ),
    },
    {
      key: "averagePerformance",
      label: "Avg. Performance",
      sortable: true,
      render: (value: number) => (
        <div className="flex items-center gap-2">
          <div className="w-16 bg-gray-200 rounded-full h-2">
            <div className="bg-green-600 h-2 rounded-full" style={{ width: `${value}%` }} />
          </div>
          <span className="text-sm text-gray-600">{Math.round(value)}%</span>
        </div>
      ),
    },
  ];

  const renderActions = (row: InstitutionUser) => (
    <>
      <DropdownMenuItem asChild><Link href={`/dashboard/users/${row.userId}`}><Eye className="w-4 h-4 mr-2" />View Details</Link></DropdownMenuItem>
      {row.status === "pending" && (
        <>
          <DropdownMenuItem className="text-green-600" onClick={() => handleUpdateStatus(row.userId, 'active')}><Check className="w-4 h-4 mr-2" />Approve</DropdownMenuItem>
          <DropdownMenuItem className="text-red-600" onClick={() => handleUpdateStatus(row.userId, 'revoked')}><X className="w-4 h-4 mr-2" />Reject</DropdownMenuItem>
        </>
      )}
      <DropdownMenuItem><Mail className="w-4 h-4 mr-2" />Send Message</DropdownMenuItem>
    </>
  );

  if (isLoading) return <div className="p-6 flex justify-center items-center min-h-screen"><Loader2 className="h-10 w-10 animate-spin text-blue-600" /></div>;
  if (isError) return <div className="p-6 text-red-500">Failed to load user data. Error: {(error as Error).message}</div>;

  const stats = data?.getUserManagementData.stats;
  const users = data?.getUserManagementData.users || [];

  return (
    <div className="p-6 space-y-6">
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="flex items-center justify-between">
        <div><h1 className="text-2xl font-bold text-gray-900">User Management</h1><p className="text-gray-600 mt-1">Manage user registrations, approvals, and performance tracking</p></div>
        <div className="flex items-center gap-3"><Button variant="outline">Export Users</Button><Button>Invite Users</Button></div>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}><Card><CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2"><CardTitle className="text-sm font-medium">Total Users</CardTitle><Users className="w-4 h-4 text-blue-600" /></CardHeader><CardContent><div className="text-2xl font-bold">{stats?.totalUsers ?? 0}</div></CardContent></Card></motion.div>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}><Card><CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2"><CardTitle className="text-sm font-medium">Active Users</CardTitle><UserCheck className="w-4 h-4 text-green-600" /></CardHeader><CardContent><div className="text-2xl font-bold">{stats?.activeUsers ?? 0}</div></CardContent></Card></motion.div>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}><Card><CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2"><CardTitle className="text-sm font-medium">Pending Approval</CardTitle><UserX className="w-4 h-4 text-orange-600" /></CardHeader><CardContent><div className="text-2xl font-bold">{stats?.pendingUsers ?? 0}</div></CardContent></Card></motion.div>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}><Card><CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2"><CardTitle className="text-sm font-medium">Avg. Performance</CardTitle><TrendingUp className="w-4 h-4 text-purple-600" /></CardHeader><CardContent><div className="text-2xl font-bold">{Math.round(stats?.averagePerformance ?? 0)}%</div></CardContent></Card></motion.div>
      </div>
      
      {selectedUsers.length > 0 && 
        <BulkActionBar
          selectedCount={selectedUsers.length}
          onClear={() => setSelectedUsers([])}
          actions={{
            approve: { handler: handleBulkApprove, isLoading: userStatusMutation.isPending },
            reject: { handler: handleBulkReject, isLoading: userStatusMutation.isPending },
          }}
          itemType="users"
        />
      }

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}>
        <Card>
          <CardHeader><CardTitle>User Directory</CardTitle><CardDescription>Manage user registrations, approvals, and track learning performance</CardDescription></CardHeader>
          <CardContent>
            <DataTable
              data={users}
              columns={columns}
              selectable
              onRowSelect={setSelectedUsers}
              actions={renderActions}
            />
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}
