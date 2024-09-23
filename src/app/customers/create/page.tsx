/* eslint-disable  @typescript-eslint/no-explicit-any */
"use client"

import React, { useState } from 'react';
import { Button, Card, Stack, TextInput, Select, TextArea } from '@sanity/ui';
import { client } from '@/sanity/client';
import Link from 'next/link';

const CustomerForm = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    dob: '',
    nationality: '',
    passportNumber: '',
    passportExpiry: '',
    visaInfo: '',
    address: {
      street: '',
      city: '',
      state: '',
      zipCode: '',
      country: '',
    },
    emergencyContact: {
      name: '',
      relation: '',
      phone: '',
    },
    travelHistory: [],
  });

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    if (name.startsWith('address.')) {
      const fieldName = name.split('.')[1];
      setFormData((prev) => ({
        ...prev,
        address: { ...prev.address, [fieldName]: value },
      }));
    } else if (name.startsWith('emergencyContact.')) {
      const fieldName = name.split('.')[1];
      setFormData((prev) => ({
        ...prev,
        emergencyContact: { ...prev.emergencyContact, [fieldName]: value },
      }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      const createdCustomer = await client.create({
        _type: 'customer',
        ...formData,
      });
      console.log('Customer created:', createdCustomer);
      await fetch('/api/revalidate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          _type: 'customer',
        }),
      });
      // Reset form or handle success as needed
    } catch (error: any) {
      console.error('Error creating customer:', error.message);
    }
  };

  return (
    <main className="flex bg-gray-100 min-h-screen flex-col p-24 gap-12">
      <div className="mb-4">
        <Link href="/customers">← Back to Customers</Link>
      </div>
      <Card padding={4}>
        <form onSubmit={handleSubmit}>
          <Stack space={4}>
            <h2>Create Customer</h2>

            <TextInput
              name="fullName"
              placeholder="Full Name"
              value={formData.fullName}
              onChange={handleChange}
              required
            />
            <TextInput
              name="email"
              type="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              required
            />
            <TextInput
              name="phone"
              type="tel"
              placeholder="Phone Number"
              value={formData.phone}
              onChange={handleChange}
              required
            />
            <input
              type='date'
              name="dob"
              placeholder="Date of Birth"
              value={formData.dob}
              onChange={handleChange}
              required
            />
            <Select
              name="nationality"
              value={formData.nationality}
              onChange={handleChange}
              required
            >
              <option value="" disabled>Select Nationality</option>
              <option value="american">American</option>
              <option value="british">British</option>
              <option value="canadian">Canadian</option>
              <option value="chinese">Chinese</option>
              <option value="french">French</option>
              <option value="german">German</option>
              <option value="indian">Indian</option>
              <option value="japanese">Japanese</option>
              <option value="korean">Korean</option>
              <option value="malaysian">Malaysian</option>
              <option value="singaporean">Singaporean</option>
              <option value="other">Other</option>
            </Select>
            <TextInput
              name="passportNumber"
              placeholder="Passport Number"
              value={formData.passportNumber}
              onChange={handleChange}
            />
            <input
              type='date'
              name="passportExpiry"
              placeholder="Passport Expiry Date"
              value={formData.passportExpiry}
              onChange={handleChange}
            />
            <TextArea
              name="visaInfo"
              placeholder="Visa Information"
              value={formData.visaInfo}
              onChange={handleChange}
            />
            <h3>Address</h3>
            <TextInput
              name="address.street"
              placeholder="Street"
              value={formData.address.street}
              onChange={handleChange}
            />
            <TextInput
              name="address.city"
              placeholder="City"
              value={formData.address.city}
              onChange={handleChange}
            />
            <TextInput
              name="address.state"
              placeholder="State"
              value={formData.address.state}
              onChange={handleChange}
            />
            <TextInput
              name="address.zipCode"
              placeholder="Zip Code"
              value={formData.address.zipCode}
              onChange={handleChange}
            />
            <TextInput
              name="address.country"
              placeholder="Country"
              value={formData.address.country}
              onChange={handleChange}
            />
            <h3>Emergency Contact</h3>
            <TextInput
              name="emergencyContact.name"
              placeholder="Contact Name"
              value={formData.emergencyContact.name}
              onChange={handleChange}
            />
            <TextInput
              name="emergencyContact.relation"
              placeholder="Relation"
              value={formData.emergencyContact.relation}
              onChange={handleChange}
            />
            <TextInput
              name="emergencyContact.phone"
              placeholder="Contact Phone Number"
              value={formData.emergencyContact.phone}
              onChange={handleChange}
            />
            <Button type="submit">Submit</Button>
          </Stack>
        </form>
      </Card>
    </main>
  );
};

export default CustomerForm;
