'use client';

import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import {
  TextField,
  Button,
  MenuItem,
  FormControl,
  FormLabel,
  RadioGroup,
  Radio,
  FormControlLabel,
  Box,
  Typography,
  Paper,
} from '@mui/material';

const formJson = {
  data: [
    { id: 1, name: 'Full Name', fieldType: 'TEXT', defaultValue: 'John Doe', required: true },
    { id: 2, name: 'Email', fieldType: 'TEXT', defaultValue: 'hello@mail.com', required: true },
    {
      id: 3,
      name: 'Gender',
      fieldType: 'LIST',
      defaultValue: 'Male',
      required: true,
      listOfValues1: ['Male', 'Female', 'Others'],
    },
    {
      id: 4,
      name: 'Love React?',
      fieldType: 'RADIO',
      defaultValue: 'Yes',
      required: true,
      listOfValues1: ['Yes', 'No'],
    },
  ],
};

export default function HomePage() {
  const { handleSubmit, control, reset } = useForm();
  const router = useRouter();

  const onSubmit = (data: any) => {
    localStorage.setItem('formData', JSON.stringify(data));
    // Redirect to dashboard after saving form data
    router.push('/dashboard');
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        bgcolor: '#fff',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        p: 3,
      }}
    >
      <Paper
        elevation={4}
        sx={{
          p: 4,
          borderRadius: 3,
          width: '100%',
          maxWidth: 480,
          bgcolor: '#fff',
        }}
      >
        <Typography variant="h5" fontWeight="bold" textAlign="center" mb={3}>
          Dynamic Signup Form
        </Typography>

        <form onSubmit={handleSubmit(onSubmit)}>
          {formJson.data.map((field) => (
            <Box key={field.id} mb={2}>
              {field.fieldType === 'TEXT' && (
                <Controller
                  name={field.name}
                  control={control}
                  defaultValue={field.defaultValue}
                  rules={{ required: field.required }}
                  render={({ field: controllerField }) => (
                    <TextField
                      {...controllerField}
                      fullWidth
                      label={field.name}
                      variant="outlined"
                      required={field.required}
                    />
                  )}
                />
              )}

              {field.fieldType === 'LIST' && (
                <Controller
                  name={field.name}
                  control={control}
                  defaultValue={field.defaultValue}
                  rules={{ required: field.required }}
                  render={({ field: controllerField }) => (
                    <TextField
                      {...controllerField}
                      select
                      fullWidth
                      label={field.name}
                      variant="outlined"
                      required={field.required}
                    >
                      {field.listOfValues1?.map((val) => (
                        <MenuItem key={val} value={val}>
                          {val}
                        </MenuItem>
                      ))}
                    </TextField>
                  )}
                />
              )}

              {field.fieldType === 'RADIO' && (
                <Controller
                  name={field.name}
                  control={control}
                  defaultValue={field.defaultValue}
                  rules={{ required: field.required }}
                  render={({ field: controllerField }) => (
                    <FormControl>
                      <FormLabel>{field.name}</FormLabel>
                      <RadioGroup
                        row
                        {...controllerField}
                        value={controllerField.value}
                        onChange={(e) => controllerField.onChange(e.target.value)}
                      >
                        {field.listOfValues1?.map((val) => (
                          <FormControlLabel key={val} value={val} control={<Radio />} label={val} />
                        ))}
                      </RadioGroup>
                    </FormControl>
                  )}
                />
              )}
            </Box>
          ))}

          <Button type="submit" fullWidth variant="contained" size="large" sx={{ mt: 2 }}>
            Submit
          </Button>
        </form>
      </Paper>
    </Box>
  );
}
