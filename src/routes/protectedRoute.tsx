import { ProtectedRouteProps } from '@/utils/interfaces';
import { useEffect, useState } from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';

function ProtectedRoute({ roles = [], children}: ProtectedRouteProps) {
  const navigate = useNavigate()

}