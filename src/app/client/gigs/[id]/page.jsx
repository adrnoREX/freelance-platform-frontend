'use client';
import React from 'react';
import { useParams } from 'next/navigation';
import GigDetailPage from '../../components/GigDetailPage';

const GigDetailWrapper = () => {
  const { id } = useParams();

  return <GigDetailPage gigId={id} />;
};

export default GigDetailWrapper;
