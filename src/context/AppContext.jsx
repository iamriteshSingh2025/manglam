import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  INITIAL_WORKERS,
  INITIAL_SERVICES,
  INITIAL_MATERIALS,
  INITIAL_REQUIREMENTS,
  INITIAL_CONTRACTORS,
  INITIAL_SUPPLIERS
} from '../data/mockData';

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  // Current logged in demo role
  // options: 'visitor', 'customer', 'worker', 'contractor', 'supplier', 'admin'
  const [currentRole, setCurrentRole] = useState(() => {
    return localStorage.getItem('kaamsetu_role') || 'visitor';
  });

  const [workers, setWorkers] = useState(() => {
    const saved = localStorage.getItem('kaamsetu_workers');
    return saved ? JSON.parse(saved) : INITIAL_WORKERS;
  });

  const [materials, setMaterials] = useState(() => {
    const saved = localStorage.getItem('kaamsetu_materials');
    return saved ? JSON.parse(saved) : INITIAL_MATERIALS;
  });

  const [services] = useState(INITIAL_SERVICES);

  const [requirements, setRequirements] = useState(() => {
    const saved = localStorage.getItem('kaamsetu_requirements');
    return saved ? JSON.parse(saved) : INITIAL_REQUIREMENTS;
  });

  const [contractors, setContractors] = useState(() => {
    const saved = localStorage.getItem('kaamsetu_contractors');
    return saved ? JSON.parse(saved) : INITIAL_CONTRACTORS;
  });

  const [suppliers, setSuppliers] = useState(() => {
    const saved = localStorage.getItem('kaamsetu_suppliers');
    return saved ? JSON.parse(saved) : INITIAL_SUPPLIERS;
  });

  const [savedWorkers, setSavedWorkers] = useState(() => {
    const saved = localStorage.getItem('kaamsetu_saved_workers');
    return saved ? JSON.parse(saved) : ['w-101', 'w-103'];
  });

  const [activeCity, setActiveCity] = useState('All Cities');

  // Global Toast / Snackbar notification
  const [toast, setToast] = useState({
    open: false,
    message: '',
    severity: 'success', // 'success' | 'info' | 'warning' | 'error'
  });

  const showNotification = (message, severity = 'success') => {
    setToast({ open: true, message, severity });
  };

  const closeToast = () => {
    setToast(prev => ({ ...prev, open: false }));
  };

  // Sync to local storage
  useEffect(() => {
    localStorage.setItem('kaamsetu_role', currentRole);
  }, [currentRole]);

  useEffect(() => {
    localStorage.setItem('kaamsetu_workers', JSON.stringify(workers));
  }, [workers]);

  useEffect(() => {
    localStorage.setItem('kaamsetu_materials', JSON.stringify(materials));
  }, [materials]);

  useEffect(() => {
    localStorage.setItem('kaamsetu_requirements', JSON.stringify(requirements));
  }, [requirements]);

  useEffect(() => {
    localStorage.setItem('kaamsetu_contractors', JSON.stringify(contractors));
  }, [contractors]);

  useEffect(() => {
    localStorage.setItem('kaamsetu_suppliers', JSON.stringify(suppliers));
  }, [suppliers]);

  useEffect(() => {
    localStorage.setItem('kaamsetu_saved_workers', JSON.stringify(savedWorkers));
  }, [savedWorkers]);

  // Actions
  const postRequirement = (formData) => {
    const refCode = `KS-REQ-${Math.floor(1000 + Math.random() * 9000)}`;
    const newReq = {
      id: refCode,
      customerName: formData.customerName || 'Anonymous Homeowner',
      mobile: formData.mobile || '+91 98XXX XXXXX',
      city: formData.city || 'Lucknow',
      locality: formData.locality || 'City Center',
      requirementType: formData.requirementType || 'New Construction',
      serviceCategory: formData.serviceCategory || 'General Construction',
      description: formData.description || 'No description provided.',
      budget: formData.budget ? `₹${formData.budget}` : 'Quotation Required',
      preferredStartDate: formData.preferredStartDate || 'Within 1 Week',
      duration: formData.duration || 'Flexible',
      scopeType: formData.scopeType || 'Labour + Material',
      status: 'New',
      createdAt: new Date().toISOString().split('T')[0],
      assignedProvider: 'Unassigned (Pending Admin Review)',
      notes: 'New requirement received via KaamSetu portal.'
    };

    setRequirements(prev => [newReq, ...prev]);
    showNotification(`Requirement posted successfully! Reference ID: ${refCode}`, 'success');
    return newReq;
  };

  const updateRequirementStatus = (reqId, newStatus, assignedProvider, notes) => {
    setRequirements(prev =>
      prev.map(item => {
        if (item.id === reqId) {
          return {
            ...item,
            status: newStatus || item.status,
            assignedProvider: assignedProvider !== undefined ? assignedProvider : item.assignedProvider,
            notes: notes !== undefined ? notes : item.notes
          };
        }
        return item;
      })
    );
    showNotification(`Requirement ${reqId} status updated to "${newStatus}"`, 'info');
  };

  const addWorker = (workerData) => {
    const newWorker = {
      id: `w-${Date.now().toString().slice(-4)}`,
      name: workerData.name,
      primarySkill: workerData.primarySkill,
      additionalSkills: workerData.additionalSkills || [],
      experienceYears: Number(workerData.experienceYears) || 0,
      city: workerData.city,
      locality: workerData.locality,
      workingRadiusKm: Number(workerData.workingRadiusKm) || 20,
      workTypes: workerData.workTypes || ['Daily Wage'],
      expectedWage: workerData.expectedWage || 'As per work scope',
      availability: workerData.availableImmediate ? 'Available Immediately' : 'Available with Notice',
      isAvailable: Boolean(workerData.availableImmediate),
      verificationStatus: 'Pending Review', // Never automatically verified!
      isVerified: false,
      rating: 5.0,
      reviewsCount: 0,
      phone: workerData.phone || '+91 XXXXXXXXXX',
      bio: workerData.bio || 'Registered construction professional.',
      projectsCompleted: 0,
      badgeText: 'New Registered Worker'
    };

    setWorkers(prev => [newWorker, ...prev]);
    showNotification(`Registration submitted! Your profile is currently Pending Admin Review.`, 'success');
    return newWorker;
  };

  const updateWorkerStatus = (workerId, newStatus) => {
    setWorkers(prev =>
      prev.map(w => {
        if (w.id === workerId) {
          const isVerified = newStatus === 'Approved';
          return { ...w, verificationStatus: newStatus, isVerified };
        }
        return w;
      })
    );
    showNotification(`Worker profile status set to: ${newStatus}`, 'info');
  };

  const toggleWorkerAvailability = (workerId) => {
    setWorkers(prev =>
      prev.map(w => {
        if (w.id === workerId) {
          const updated = !w.isAvailable;
          return {
            ...w,
            isAvailable: updated,
            availability: updated ? 'Available Immediately' : 'Currently Busy on Project'
          };
        }
        return w;
      })
    );
    showNotification('Availability status updated.', 'info');
  };

  const addContractor = (contractorData) => {
    const newContractor = {
      id: `c-${Date.now().toString().slice(-4)}`,
      businessName: contractorData.businessName,
      contactPerson: contractorData.contactPerson,
      mobile: contractorData.mobile,
      city: contractorData.city,
      serviceArea: contractorData.serviceArea,
      servicesOffered: contractorData.servicesOffered || [],
      teamSize: contractorData.teamSize || '10-20 Workers',
      projectType: contractorData.projectType || ['Residential Construction'],
      description: contractorData.description || 'Registered contractor.',
      verificationStatus: 'Pending Review',
      projectsCompleted: 0,
      rating: 5.0
    };

    setContractors(prev => [newContractor, ...prev]);
    showNotification('Contractor profile registered! Sent to Admin for verification.', 'success');
    return newContractor;
  };

  const updateContractorStatus = (id, newStatus) => {
    setContractors(prev =>
      prev.map(c => (c.id === id ? { ...c, verificationStatus: newStatus } : c))
    );
    showNotification(`Contractor status updated to: ${newStatus}`, 'info');
  };

  const addSupplier = (supplierData) => {
    const newSup = {
      id: `sup-${Date.now().toString().slice(-4)}`,
      businessName: supplierData.businessName,
      contactPerson: supplierData.contactPerson,
      phone: supplierData.phone,
      email: supplierData.email,
      location: supplierData.location,
      deliveryLocations: supplierData.deliveryLocations || [supplierData.city || 'Lucknow'],
      materialCategories: supplierData.materialCategories || ['General Materials'],
      pricingModel: supplierData.pricingModel || 'Quotation on Request',
      minOrderQty: supplierData.minOrderQty || 'Negotiable',
      verificationStatus: 'Pending Review',
      rating: 5.0,
      activeProductsCount: 1
    };

    setSuppliers(prev => [newSup, ...prev]);
    showNotification('Supplier business registered! Profile is Under Review by KaamSetu admin.', 'success');
    return newSup;
  };

  const updateSupplierStatus = (id, newStatus) => {
    setSuppliers(prev =>
      prev.map(s => (s.id === id ? { ...s, verificationStatus: newStatus } : s))
    );
    showNotification(`Supplier status updated to: ${newStatus}`, 'info');
  };

  const addMaterial = (matData) => {
    const newMat = {
      id: `mat-${Date.now().toString().slice(-4)}`,
      name: matData.name,
      category: matData.category,
      supplierName: matData.supplierName || 'UltraBuild Materials',
      supplierCity: matData.supplierCity || 'Lucknow',
      deliveryLocations: matData.deliveryLocations || ['Lucknow', 'Kanpur'],
      price: Number(matData.price) || 0,
      priceType: matData.price ? 'Fixed / Current Rate' : 'Request Price',
      unit: matData.unit || 'Piece',
      minOrderQty: matData.minOrderQty || '1 Unit',
      availability: 'In Stock',
      rating: 5.0,
      reviewsCount: 0,
      description: matData.description || 'Certified quality construction material.',
      specifications: matData.specifications || {},
      demoSupplierVerified: true
    };

    setMaterials(prev => [newMat, ...prev]);
    showNotification('Product/Material listing added successfully!', 'success');
    return newMat;
  };

  const toggleSaveWorker = (workerId) => {
    setSavedWorkers(prev => {
      const exists = prev.includes(workerId);
      if (exists) {
        showNotification('Removed worker from saved list', 'info');
        return prev.filter(id => id !== workerId);
      } else {
        showNotification('Worker bookmarked to your saved list!', 'success');
        return [...prev, workerId];
      }
    });
  };

  return (
    <AppContext.Provider
      value={{
        currentRole,
        setCurrentRole,
        workers,
        addWorker,
        updateWorkerStatus,
        toggleWorkerAvailability,
        materials,
        addMaterial,
        services,
        requirements,
        postRequirement,
        updateRequirementStatus,
        contractors,
        addContractor,
        updateContractorStatus,
        suppliers,
        addSupplier,
        updateSupplierStatus,
        savedWorkers,
        toggleSaveWorker,
        activeCity,
        setActiveCity,
        toast,
        showNotification,
        closeToast
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
