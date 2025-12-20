"use client";

import { PillarLayout } from '@/components/dashboard/pillar-layout';
import { PanelsTopLeft, RefreshCw, Server, Database, AlertCircle } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const reliabilityControls = [
  {
    id: 'rel-1',
    name: 'Fault Tolerance',
    description: 'Design for failure with redundancy and graceful degradation',
    status: 'compliant',
    icon: RefreshCw,
  },
  {
    id: 'rel-2',
    name: 'High Availability',
    description: 'Ensure systems are available when needed',
    status: 'compliant',
    icon: Server,
  },
  {
    id: 'rel-3',
    name: 'Disaster Recovery',
    description: 'Prepare for and recover from disasters',
    status: 'partial',
    icon: AlertCircle,
  },
  {
    id: 'rel-4',
    name: 'Data Backup',
    description: 'Implement comprehensive backup strategies',
    status: 'compliant',
    icon: Database,
  },
  {
    id: 'rel-5',
    name: 'Change Management',
    description: 'Manage changes to minimize disruption',
    status: 'partial',
    icon: RefreshCw,
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

export default function ReliabilityPage() {
  return (
    <PillarLayout
      title="Reliability"
      description="Ensure your workloads perform their intended functions correctly and consistently."
      icon={<PanelsTopLeft className="h-6 w-6 text-blue-500" />}
      iconBg="bg-blue-100"
      score={96}
    >
      <div className="space-y-6">
        <div className="grid gap-4">
          <h2 className="text-xl font-semibold">Reliability Controls</h2>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {reliabilityControls.map((control) => (
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
