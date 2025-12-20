"use client";

import { PillarLayout } from '@/components/dashboard/pillar-layout';
import { ShieldCheck, Lock, Key, UserCheck, AlertTriangle } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const securityControls = [
  {
    id: 'sec-1',
    name: 'Identity and Access Management',
    description: 'Implement least privilege access and strong authentication',
    status: 'compliant',
    icon: UserCheck,
  },
  {
    id: 'sec-2',
    name: 'Data Protection',
    description: 'Encrypt data at rest and in transit',
    status: 'partial',
    icon: Lock,
  },
  {
    id: 'sec-3',
    name: 'Infrastructure Protection',
    description: 'Protect systems from unauthorized access',
    status: 'action-required',
    icon: ShieldCheck,
  },
  {
    id: 'sec-4',
    name: 'Incident Response',
    description: 'Prepare for and respond to security events',
    status: 'partial',
    icon: AlertTriangle,
  },
  {
    id: 'sec-5',
    name: 'Key Management',
    description: 'Securely manage cryptographic keys',
    status: 'compliant',
    icon: Key,
  },
];

const statusColors = {
  'compliant': 'bg-green-100 text-green-800',
  'partial': 'bg-yellow-100 text-yellow-800',
  'action-required': 'bg-red-100 text-red-800',
};

const statusLabels = {
  'compliant': 'Compliant',
  'partial': 'Partial',
  'action-required': 'Action Required',
};

export default function SecurityPage() {
  return (
    <PillarLayout
      title="Security"
      description="Protect your data, systems, and assets with cloud security best practices."
      icon={<ShieldCheck className="h-6 w-6 text-orange-500" />}
      iconBg="bg-orange-100"
      score={75}
    >
      <div className="space-y-6">
        <div className="grid gap-4">
          <h2 className="text-xl font-semibold">Security Controls</h2>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {securityControls.map((control) => (
              <Card key={control.id} className="hover:shadow-md transition-shadow cursor-pointer">
                <CardHeader className="pb-2">
                  <div className="flex items-center justify-between">
                    <control.icon className="h-5 w-5 text-muted-foreground" />
                    <Badge className={statusColors[control.status as keyof typeof statusColors]}>
                      {statusLabels[control.status as keyof typeof statusLabels]}
                    </Badge>
                  </div>
                  <CardTitle className="text-base">{control.name}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>{control.description}</CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </PillarLayout>
  );
}
