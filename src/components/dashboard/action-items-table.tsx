"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import { useState, useEffect } from 'react';
import { db } from '@/lib/firebase';
import { collection, getDocs, Firestore } from 'firebase/firestore';

// Define the type for an action item
interface ActionItem {
  id: string;
  name: string;
  uuid: string;
  type: string;
  recommendation_action: string;
  date: string;
  state: string;
  cost: number;
}

export function ActionItemsTable() {
  const [actionItems, setActionItems] = useState<ActionItem[]>([]);

  useEffect(() => {
    const fetchActionItems = async () => {
      if (!db) return; // Guard clause for undefined db
      const querySnapshot = await getDocs(collection(db as Firestore, "action_items"));
      const items = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as ActionItem));
      setActionItems(items);
    };

    fetchActionItems();
  }, []);

  const handleExport = () => {
    const headers = ["Name", "UUID", "Type", "Recommendation Action", "Date", "State", "Cost"];
    const csvContent = [
      headers.join(","),
      ...actionItems.map(item => 
        [
          item.name,
          item.uuid,
          item.type,
          `"${item.recommendation_action}"`,
          item.date,
          item.state,
          item.cost.toFixed(2)
        ].join(",")
      )
    ].join("\n");

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement("a");
    const url = URL.createObjectURL(blob);
    link.setAttribute("href", url);
    link.setAttribute("download", "action-items.csv");
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const getStateBadgeVariant = (state: string) => {
    switch (state.toLowerCase()) {
      case 'active':
        return 'success';
      case 'warning':
        return 'secondary';
      case 'critical':
        return 'destructive';
      default:
        return 'outline';
    }
  }

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle>Action Items</CardTitle>
          <CardDescription>
            Recommended actions based on the analysis.
          </CardDescription>
        </div>
        <Button variant="outline" size="sm" onClick={handleExport}>
          <Download className="mr-2 h-4 w-4" />
          Export CSV
        </Button>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>UUID</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Recommendation</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>State</TableHead>
              <TableHead className="text-right">Cost</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {actionItems.map((item) => (
              <TableRow key={item.uuid}>
                <TableCell className="font-medium text-xs">{item.name}</TableCell>
                <TableCell className="text-xs">{item.uuid}</TableCell>
                <TableCell className="text-xs">{item.type}</TableCell>
                <TableCell className="text-xs">{item.recommendation_action}</TableCell>
                <TableCell className="text-xs">{item.date}</TableCell>
                <TableCell>
                  <Badge variant={getStateBadgeVariant(item.state)}>
                    {item.state}
                  </Badge>
                </TableCell>
                <TableCell className="text-right text-xs">
                  ${item.cost.toFixed(2)}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
