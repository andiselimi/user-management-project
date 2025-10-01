import type { FC } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

interface UserCardProps {
  user: {
    name: string;
    email: string;
    company: { name: string };
  };
}

const UserCard: FC<UserCardProps> = ({ user }) => {
  return (
    <Card className="hover:shadow-lg transition-shadow">
      <CardHeader>
        <CardTitle className="text-lg">{user.name}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-1">
        <p className="text-sm text-gray-600">{user.email}</p>
        <p className="text-sm text-gray-500">Company: {user.company.name}</p>
      </CardContent>
    </Card>
  );
};

export default UserCard;
