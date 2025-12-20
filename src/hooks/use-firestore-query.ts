"use client";

import { useState, useEffect, useCallback } from "react";
import { db } from "@/lib/firebase";
import {
  collection,
  query,
  getDocs,
  QueryConstraint,
  DocumentData,
  onSnapshot,
  Unsubscribe,
} from "firebase/firestore";

interface UseFirestoreQueryResult<T> {
  data: T[];
  loading: boolean;
  error: Error | null;
  refetch: () => Promise<void>;
}

/**
 * Custom hook for querying Firestore collections with error handling
 * @param collectionPath - Path to the Firestore collection
 * @param queryConstraints - Optional query constraints (where, orderBy, limit)
 * @param realtime - Whether to use real-time updates
 */
export function useFirestoreQuery<T = DocumentData>(
  collectionPath: string,
  queryConstraints: QueryConstraint[] = [],
  realtime: boolean = false,
): UseFirestoreQueryResult<T> {
  const [data, setData] = useState<T[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchData = useCallback(async () => {
    if (!db) {
      setError(new Error("Firebase not initialized"));
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      setError(null);
      
      const collectionRef = collection(db, collectionPath);
      const q = queryConstraints.length > 0 
        ? query(collectionRef, ...queryConstraints) 
        : query(collectionRef);
      
      const snapshot = await getDocs(q);
      const items = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as T[];
      
      setData(items);
    } catch (err) {
      console.error(`Firestore query error for ${collectionPath}:`, err);
      setError(err instanceof Error ? err : new Error("Failed to fetch data"));
    } finally {
      setLoading(false);
    }
  }, [collectionPath, queryConstraints]);

  useEffect(() => {
    if (!db) {
      setError(new Error("Firebase not initialized"));
      setLoading(false);
      return;
    }

    let unsubscribe: Unsubscribe | undefined;

    if (realtime) {
      // Real-time listener
      const collectionRef = collection(db, collectionPath);
      const q = queryConstraints.length > 0 
        ? query(collectionRef, ...queryConstraints) 
        : query(collectionRef);

      unsubscribe = onSnapshot(
        q,
        (snapshot) => {
          const items = snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          })) as T[];
          setData(items);
          setLoading(false);
          setError(null);
        },
        (err) => {
          console.error(`Firestore realtime error for ${collectionPath}:`, err);
          setError(err);
          setLoading(false);
        },
      );
    } else {
      // One-time fetch
      fetchData();
    }

    return () => {
      if (unsubscribe) {
        unsubscribe();
      }
    };
  }, [collectionPath, realtime, fetchData, queryConstraints]);

  return { data, loading, error, refetch: fetchData };
}
