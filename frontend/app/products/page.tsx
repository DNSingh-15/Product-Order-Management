'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import {
  Box,
  Button,
  TextField,
  Typography,
  Paper,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Stack,
  Pagination,
  IconButton,
  Tooltip,
} from '@mui/material';
import { Edit, Delete, Save, Cancel } from '@mui/icons-material';
import { useForm } from 'react-hook-form';
import api from '@/services/api';

interface Product {
  id?: number;
  name: string;
  price: number;
}

const productFormFields = [
  {
    name: 'name',
    label: 'Name',
    placeholder: 'Enter product name',
    type: 'text',
    rules: { required: 'Name is required' },
    sx: { flex: 1, minWidth: 180 },
  },
  {
    name: 'price',
    label: 'Price',
    placeholder: 'Enter price',
    type: 'number',
    rules: { required: 'Price is required' },
    sx: { flex: 1, minWidth: 120 },
  },
];

export default function ProductsPage() {
  const { register, handleSubmit, reset, setValue } = useForm<Product>();
  const [products, setProducts] = useState<Product[]>([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [editingId, setEditingId] = useState<number | null>(null);

  const fetchProducts = async (pageNum = 1) => {
    const res = await api.get(`http://localhost:3001/products?page=${pageNum}&limit=10`);
    setProducts(res.data.data);
    setTotal(res.data.total);
    setPage(res.data.page);
  };

  const onSubmit = async (data: Product) => {
    if (editingId) {
      await api.put(`http://localhost:3001/products/${editingId}`, data);
      setEditingId(null);
    } else {
      await api.post('http://localhost:3001/products', data);
    }
    fetchProducts(page);
    reset();
  };

  const handleDelete = async (id: number) => {
    await api.delete(`http://localhost:3001/products/${id}`);
    fetchProducts(page);
  };

  const handleEdit = (product: Product) => {
    setEditingId(product.id || null);
    reset();
    Object.entries(product).forEach(([key, value]) => {
      if (key in product) setValue(key as keyof Product, value as any);
    });
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <Box sx={{ p: 3, bgcolor: '#f9f9f9', minHeight: '100vh' }}>
      <Stack direction="row" justifyContent="space-between" alignItems="center" mb={2}>
        <Typography variant="h5" fontWeight="bold">
          Product Management
        </Typography>
        <Stack direction="row" gap={1}>
          <Link href="/orders">
            <Button variant="outlined" size="small" color="primary">
              Orders
            </Button>
          </Link>
          <Link href="/dashboard">
            <Button variant="outlined" size="small" color="secondary">
              Dashboard
            </Button>
          </Link>
        </Stack>
      </Stack>

      {/* Dynamic Form */}
      <Paper sx={{ p: 2, mb: 2 }}>
        <Typography variant="subtitle1" mb={1} fontWeight="bold">
          {editingId ? 'Update Product' : 'Add Product'}
        </Typography>

        <form
          onSubmit={handleSubmit(onSubmit)}
          style={{
            display: 'flex',
            gap: '0.5rem',
            flexWrap: 'wrap',
            alignItems: 'center',
          }}
        >
          {productFormFields.map((field) => (
            <TextField
              key={field.name}
              label={field.label}
              placeholder={field.placeholder}
              type={field.type}
              {...register(field.name as keyof Product, field.rules)}
              variant="outlined"
              size="small"
              sx={field.sx}
              InputLabelProps={{ shrink: true }}
            />
          ))}

          <Button
            type="submit"
            variant="contained"
            size="small"
            color={editingId ? 'success' : 'primary'}
            startIcon={editingId ? <Save /> : undefined}
          >
            {editingId ? 'Save' : 'Add'}
          </Button>

          {editingId && (
            <Button
              variant="outlined"
              size="small"
              color="warning"
              startIcon={<Cancel />}
              onClick={() => {
                reset();
                setEditingId(null);
              }}
            >
              Cancel
            </Button>
          )}
        </form>
      </Paper>

      <Paper sx={{ p: 2 }}>
        <Typography variant="subtitle1" mb={1} fontWeight="bold">
          Product List
        </Typography>

        <Table size="small" sx={{ tableLayout: 'fixed' }}>
          <TableHead>
            <TableRow>
              <TableCell sx={{ width: '10%' }}>
                <b>ID</b>
              </TableCell>
              <TableCell sx={{ width: '40%' }}>
                <b>Name</b>
              </TableCell>
              <TableCell sx={{ width: '25%' }}>
                <b>Price</b>
              </TableCell>
              <TableCell align="center" sx={{ width: '25%' }}>
                <b>Actions</b>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {products.map((p) => (
              <TableRow key={p.id} hover>
                <TableCell>{p.id}</TableCell>
                <TableCell>{p.name}</TableCell>
                <TableCell>{p.price}</TableCell>
                <TableCell align="center">
                  <Stack direction="row" spacing={0.5} justifyContent="center">
                    <Tooltip title="Edit">
                      <IconButton size="small" color="primary" onClick={() => handleEdit(p)}>
                        <Edit fontSize="small" />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Delete">
                      <IconButton
                        size="small"
                        color="error"
                        onClick={() => p.id && handleDelete(p.id)}
                      >
                        <Delete fontSize="small" />
                      </IconButton>
                    </Tooltip>
                  </Stack>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        <Stack alignItems="center" mt={2}>
          <Pagination
            size="small"
            count={Math.ceil(total / 10)}
            page={page}
            onChange={(_, value) => fetchProducts(value)}
          />
        </Stack>
      </Paper>
    </Box>
  );
}
