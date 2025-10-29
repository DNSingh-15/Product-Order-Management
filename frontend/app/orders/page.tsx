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
  Select,
  MenuItem,
  IconButton,
  Pagination,
  Tooltip,
} from '@mui/material';
import { useForm, Controller } from 'react-hook-form';
import api from '@/services/api';
import { Edit, Delete, Save, Cancel } from '@mui/icons-material';

interface Product {
  id: number;
  name: string;
  price: number;
}

interface Order {
  id?: number;
  productId: number;
  quantity: number;
  totalPrice?: number;
  product?: Product;
}

const orderFormFields = [
  {
    name: 'productId',
    label: 'Product',
    type: 'select',
    placeholder: 'Select Product',
    rules: { required: 'Product is required' },
    sx: { minWidth: 200 },
  },
  {
    name: 'quantity',
    label: 'Quantity',
    type: 'number',
    placeholder: 'Enter quantity',
    rules: { required: 'Quantity is required' },
    sx: { minWidth: 150 },
  },
];

export default function OrdersPage() {
  const { control, register, handleSubmit, reset } = useForm<Order>();
  const [orders, setOrders] = useState<Order[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [editingOrderId, setEditingOrderId] = useState<number | null>(null);
  const [editQuantity, setEditQuantity] = useState<number>(0);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);

  const fetchOrders = async (pageNum = 1) => {
    const res = await api.get(`http://localhost:3002/orders?page=${pageNum}&limit=10`);
    setOrders(res.data.data);
    setTotal(res.data.total);
    setPage(res.data.page);
  };

  const fetchProducts = async () => {
    const res = await api.get('http://localhost:3001/products');
    setProducts(res.data.data);
  };

  useEffect(() => {
    fetchOrders();
    fetchProducts();
  }, []);

  const onSubmit = async (data: Order) => {
    await api.post('http://localhost:3002/orders', {
      productId: Number(data.productId),
      quantity: Number(data.quantity),
    });
    fetchOrders(page);
    reset();
  };

  const handleDelete = async (id: number) => {
    await api.delete(`http://localhost:3002/orders/${id}`);
    fetchOrders(page);
  };

  const handleEdit = (order: Order) => {
    setEditingOrderId(order.id || null);
    setEditQuantity(order.quantity);
  };

  const handleUpdate = async (id: number) => {
    await api.put(`http://localhost:3002/orders/${id}`, {
      quantity: editQuantity,
    });
    setEditingOrderId(null);
    fetchOrders(page);
  };

  return (
    <Box sx={{ p: 3, bgcolor: '#f9f9f9', minHeight: '100vh' }}>
      <Stack direction="row" justifyContent="space-between" alignItems="center" mb={2}>
        <Typography variant="h5" fontWeight="bold">
          Order Management
        </Typography>
        <Stack direction="row" gap={1}>
          <Link href="/products">
            <Button variant="outlined" size="small" color="primary">
              Products
            </Button>
          </Link>
          <Link href="/dashboard">
            <Button variant="outlined" size="small" color="secondary">
              Dashboard
            </Button>
          </Link>
        </Stack>
      </Stack>

      <Paper sx={{ p: 2, mb: 2 }}>
        <Typography variant="subtitle1" mb={1} fontWeight="bold">
          Create Order
        </Typography>

        <form
          onSubmit={handleSubmit(onSubmit)}
          style={{
            display: 'flex',
            gap: '0.6rem',
            flexWrap: 'wrap',
            alignItems: 'center',
          }}
        >
          {orderFormFields.map((field) =>
            field.type === 'select' ? (
              <Controller
                key={field.name}
                name={field.name as keyof Order}
                control={control}
                rules={field.rules}
                defaultValue={0}
                render={({ field: controllerField }) => (
                  <Select
                    {...controllerField}
                    displayEmpty
                    size="small"
                    sx={field.sx}
                  >
                    <MenuItem value="" disabled>
                      {field.placeholder}
                    </MenuItem>
                    {products.map((p) => (
                      <MenuItem key={p.id} value={p.id}>
                        {p.name} (${p.price})
                      </MenuItem>
                    ))}
                  </Select>
                )}
              />
            ) : (
              <TextField
                key={field.name}
                label={field.label}
                placeholder={field.placeholder}
                type={field.type}
                size="small"
                {...register(field.name as keyof Order, field.rules)}
                variant="outlined"
                sx={field.sx}
                InputLabelProps={{ shrink: true }}
              />
            )
          )}

          <Button type="submit" variant="contained" size="small">
            Create
          </Button>
        </form>
      </Paper>

      <Paper sx={{ p: 2 }}>
        <Typography variant="subtitle1" mb={1} fontWeight="bold">
          Orders List
        </Typography>

        <Table size="small" sx={{ tableLayout: 'fixed' }}>
          <TableHead>
            <TableRow>
              <TableCell>
                <b>ID</b>
              </TableCell>
              <TableCell>
                <b>Product</b>
              </TableCell>
              <TableCell>
                <b>Quantity</b>
              </TableCell>
              <TableCell>
                <b>Total Price</b>
              </TableCell>
              <TableCell align="center">
                <b>Actions</b>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {orders.map((o) => (
              <TableRow key={o.id} hover>
                <TableCell>{o.id}</TableCell>
                <TableCell>{o.product?.name || o.productId}</TableCell>
                <TableCell>
                  {editingOrderId === o.id ? (
                    <TextField
                      type="number"
                      size="small"
                      value={editQuantity}
                      onChange={(e) => setEditQuantity(Number(e.target.value))}
                      sx={{ width: 80 }}
                    />
                  ) : (
                    o.quantity
                  )}
                </TableCell>
                <TableCell>{o.totalPrice}</TableCell>
                <TableCell align="center">
                  {editingOrderId === o.id ? (
                    <Stack direction="row" spacing={0.5} justifyContent="center">
                      <Tooltip title="Save">
                        <IconButton
                          size="small"
                          color="success"
                          onClick={() => handleUpdate(o.id!)}
                        >
                          <Save fontSize="small" />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="Cancel">
                        <IconButton
                          size="small"
                          color="warning"
                          onClick={() => setEditingOrderId(null)}
                        >
                          <Cancel fontSize="small" />
                        </IconButton>
                      </Tooltip>
                    </Stack>
                  ) : (
                    <Stack direction="row" spacing={0.5} justifyContent="center">
                      <Tooltip title="Edit">
                        <IconButton
                          size="small"
                          color="primary"
                          onClick={() => handleEdit(o)}
                        >
                          <Edit fontSize="small" />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="Delete">
                        <IconButton
                          size="small"
                          color="error"
                          onClick={() => o.id && handleDelete(o.id)}
                        >
                          <Delete fontSize="small" />
                        </IconButton>
                      </Tooltip>
                    </Stack>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        {/* Pagination */}
        <Stack alignItems="center" mt={2}>
          <Pagination
            size="small"
            count={Math.ceil(total / 10)}
            page={page}
            onChange={(_, value) => fetchOrders(value)}
          />
        </Stack>
      </Paper>
    </Box>
  );
}
