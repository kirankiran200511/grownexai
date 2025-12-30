// Added import to resolve 'Cannot find namespace React'
import React from 'react';

export interface ServiceCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
}

export interface StepProps {
  number: string;
  title: string;
  description: string;
}