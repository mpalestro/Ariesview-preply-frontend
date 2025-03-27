export interface LeaseDetails {
  partiesAndIdentification: {
    tenantName: string;
    landlordName: string;
    guarantors?: string[];
    leaseExecutionDate: string;
    leaseType: string;
    tenantNoticeAddress: string;
    landlordNoticeAddress: string;
  };
  premisesDescription: {
    address: string;
    suiteFloorUnit: string;
    squareFootage: {
      netRentableArea: number;
      usableSpace: number;
    };
    commonAreaUsage: string[];
    permittedUse: string;
    exclusiveUse?: string;
    parking: {
      spaces: number;
      type: string;
      location: string;
    };
    storage?: {
      area: number;
      location: string;
    };
  };
  leaseTerm: {
    initialTerm: {
      start: string;
      end: string;
    };
    rentCommencementDate: string;
    earlyAccess?: {
      date: string;
      conditions: string;
    };
    renewalOptions: {
      numberOfRenewals: number;
      termLength: string;
      rentAdjustments: string;
    };
    terminationOptions?: {
      conditions: string;
      notice: string;
    };
    holdoverTerms: string;
  };
  rentStructure: {
    baseRent: {
      amount: number;
      frequency: string;
    };
    rentEscalations: {
      type: string;
      amount: string;
    };
    additionalCharges: {
      cam: boolean;
      taxes: boolean;
      insurance: boolean;
      utilities: boolean;
    };
    rentDueDate: string;
    lateFees: {
      percentage: number;
      gracePeriod: number;
    };
    securityDeposit: number;
    freeRentConcessions?: {
      period: string;
      conditions: string;
    };
    percentageRent?: {
      threshold: number;
      percentage: number;
    };
  };
  operatingExpenses: {
    baseYear?: string;
    expenseStop?: number;
    proRataShare: number;
    camCap?: {
      amount: number;
      type: string;
    };
    insurance: {
      landlordResponsibilities: string[];
      tenantResponsibilities: string[];
    };
    taxes: {
      responsibility: string;
      specialAssessments: string;
    };
    utilities: {
      type: string;
      responsibility: string;
    };
    auditRights: {
      period: string;
      conditions: string;
    };
  };
  maintenanceAndRepairs: {
    tenantResponsibilities: string[];
    landlordResponsibilities: string[];
    hvacMaintenance: {
      responsibility: string;
      frequency: string;
    };
    repairs: {
      tenant: string[];
      landlord: string[];
    };
    alterations: {
      permittedChanges: string;
      approvalProcess: string;
    };
    restorationObligations: string;
    codeCompliance: string;
  };
  insurance: {
    tenant: {
      generalLiability: {
        perOccurrence: number;
        aggregate: number;
      };
      propertyInsurance: boolean;
      businessInterruption: boolean;
      workersComp: boolean;
      additional?: string[];
    };
    landlord: {
      propertyInsurance: boolean;
      liability: {
        coverage: number;
      };
    };
    waiverOfSubrogation: boolean;
    indemnification: string;
  };
  defaultAndRemedies: {
    tenantDefaults: string[];
    curePeriod: number;
    landlordRemedies: string[];
    forceMajeure: string;
    disputeResolution: string;
    attorneyFees: string;
  };
  assignmentAndSublease: {
    assignmentRights: string;
    landlordConsent: string;
    subleasingTerms: string;
    coTenancy?: {
      requirements: string;
      remedies: string;
    };
    rightOfFirstRefusal?: {
      notice: string;
      terms: string;
    };
  };
  specialClauses: {
    relocationClause?: string;
    expansionRights?: string;
    signageRights: string;
    environmentalClauses: string;
    eminentDomain: string;
    landlordSale: string;
    brokerageFees: string;
  };
  additionalNotes: {
    keyDates: {
      [key: string]: string;
    };
    concessions?: string[];
    specialRights?: string[];
    documents: string[];
  };
}

// Sample lease details for demo properties
export const leaseDetailsData: { [key: string]: LeaseDetails } = {
  'prop-001': {
    partiesAndIdentification: {
      tenantName: "Acme Tech Solutions LLC",
      landlordName: "AriesView Properties II, LLC",
      guarantors: ["John Smith, CEO"],
      leaseExecutionDate: "2021-05-15",
      leaseType: "Modified Gross Lease",
      tenantNoticeAddress: "123 Main Street, Suite 1500, New York, NY 10001",
      landlordNoticeAddress: "789 Investment Ave, Suite 300, New York, NY 10013"
    },
    premisesDescription: {
      address: "123 Main Street, New York, NY 10001",
      suiteFloorUnit: "15th Floor",
      squareFootage: {
        netRentableArea: 12000,
        usableSpace: 11500
      },
      commonAreaUsage: [
        "Main Lobby",
        "Elevator Banks",
        "Common Restrooms",
        "Shared Conference Center"
      ],
      permittedUse: "General Office and Technology Development",
      exclusiveUse: "Exclusive right to operate a technology consulting business",
      parking: {
        spaces: 25,
        type: "Reserved",
        location: "Underground Garage Levels P1 and P2"
      },
      storage: {
        area: 500,
        location: "Basement Storage Unit B15"
      }
    },
    leaseTerm: {
      initialTerm: {
        start: "2021-07-01",
        end: "2026-06-30"
      },
      rentCommencementDate: "2021-07-01",
      earlyAccess: {
        date: "2021-06-01",
        conditions: "Tenant Improvements and Setup"
      },
      renewalOptions: {
        numberOfRenewals: 2,
        termLength: "5 years each",
        rentAdjustments: "Fair Market Value with 3% minimum increase"
      },
      terminationOptions: {
        conditions: "After 36 months with 6 months notice",
        notice: "Written notice required"
      },
      holdoverTerms: "150% of last month's rent"
    },
    rentStructure: {
      baseRent: {
        amount: 45000,
        frequency: "Monthly"
      },
      rentEscalations: {
        type: "Fixed",
        amount: "3% annually"
      },
      additionalCharges: {
        cam: true,
        taxes: true,
        insurance: true,
        utilities: true
      },
      rentDueDate: "1st of each month",
      lateFees: {
        percentage: 5,
        gracePeriod: 5
      },
      securityDeposit: 90000,
      freeRentConcessions: {
        period: "First 2 months",
        conditions: "Tenant improvements completion"
      }
    },
    operatingExpenses: {
      baseYear: "2021",
      proRataShare: 15.5,
      camCap: {
        amount: 5,
        type: "Annual Increase"
      },
      insurance: {
        landlordResponsibilities: ["Building Insurance", "General Liability"],
        tenantResponsibilities: ["Contents Insurance", "Business Interruption"]
      },
      taxes: {
        responsibility: "Proportionate Share of Increases",
        specialAssessments: "Passed through to tenant"
      },
      utilities: {
        type: "Separately Metered",
        responsibility: "Direct Tenant Payment"
      },
      auditRights: {
        period: "Within 6 months of statement",
        conditions: "Once per calendar year"
      }
    },
    maintenanceAndRepairs: {
      tenantResponsibilities: [
        "Interior maintenance",
        "Light bulb replacement",
        "Carpet cleaning",
        "Interior paint"
      ],
      landlordResponsibilities: [
        "Structural elements",
        "Common areas",
        "Building systems",
        "Exterior maintenance"
      ],
      hvacMaintenance: {
        responsibility: "Landlord with tenant reimbursement",
        frequency: "Quarterly"
      },
      repairs: {
        tenant: ["Minor repairs", "Fixtures", "Supplemental HVAC"],
        landlord: ["Major systems", "Roof", "Foundation", "Building envelope"]
      },
      alterations: {
        permittedChanges: "Non-structural with landlord approval",
        approvalProcess: "Written request with plans required"
      },
      restorationObligations: "Remove custom improvements at lease end",
      codeCompliance: "Tenant responsible for business-specific requirements"
    },
    insurance: {
      tenant: {
        generalLiability: {
          perOccurrence: 1000000,
          aggregate: 2000000
        },
        propertyInsurance: true,
        businessInterruption: true,
        workersComp: true,
        additional: ["Cyber Liability", "Professional Liability"]
      },
      landlord: {
        propertyInsurance: true,
        liability: {
          coverage: 5000000
        }
      },
      waiverOfSubrogation: true,
      indemnification: "Standard cross-indemnification"
    },
    defaultAndRemedies: {
      tenantDefaults: [
        "Non-payment of rent",
        "Breach of lease terms",
        "Bankruptcy",
        "Abandonment"
      ],
      curePeriod: 10,
      landlordRemedies: [
        "Termination of lease",
        "Recovery of damages",
        "Right to re-let",
        "Collection of rent"
      ],
      forceMajeure: "Standard clause excluding rent payment obligations",
      disputeResolution: "Mediation then binding arbitration",
      attorneyFees: "Prevailing party entitled to reasonable fees"
    },
    assignmentAndSublease: {
      assignmentRights: "With landlord consent not unreasonably withheld",
      landlordConsent: "30 days to respond to request",
      subleasingTerms: "Permitted with landlord approval",
      coTenancy: {
        requirements: "N/A",
        remedies: "N/A"
      },
      rightOfFirstRefusal: {
        notice: "10 days",
        terms: "Adjacent space on floor"
      }
    },
    specialClauses: {
      relocationClause: "Not applicable",
      expansionRights: "Right of first offer on adjacent space",
      signageRights: "Building directory and suite entrance",
      environmentalClauses: "Standard compliance required",
      eminentDomain: "Lease terminates if premises substantially affected",
      landlordSale: "Lease survives sale",
      brokerageFees: "Paid by landlord"
    },
    additionalNotes: {
      keyDates: {
        "Rent Adjustment": "July 1 annually",
        "Insurance Renewal": "June 1 annually",
        "CAM Reconciliation": "March 31 annually"
      },
      concessions: [
        "Two months free rent",
        "$50 psf TI Allowance",
        "Moving allowance"
      ],
      specialRights: [
        "24/7 access",
        "Supplemental HVAC available",
        "Generator backup"
      ],
      documents: [
        "Original Lease",
        "First Amendment",
        "Insurance Certificates",
        "SNDA"
      ]
    }
  }
  // Additional properties would follow the same structure...
};

// Helper function to get default lease details template
export function getDefaultLeaseDetails(): LeaseDetails {
  return {
    partiesAndIdentification: {
      tenantName: "",
      landlordName: "AriesView Properties LLC",
      guarantors: [],
      leaseExecutionDate: "",
      leaseType: "",
      tenantNoticeAddress: "",
      landlordNoticeAddress: ""
    },
    premisesDescription: {
      address: "",
      suiteFloorUnit: "",
      squareFootage: {
        netRentableArea: 0,
        usableSpace: 0
      },
      commonAreaUsage: [],
      permittedUse: "",
      exclusiveUse: "",
      parking: {
        spaces: 0,
        type: "",
        location: ""
      },
      storage: {
        area: 0,
        location: ""
      }
    },
    leaseTerm: {
      initialTerm: {
        start: "",
        end: ""
      },
      rentCommencementDate: "",
      earlyAccess: {
        date: "",
        conditions: ""
      },
      renewalOptions: {
        numberOfRenewals: 0,
        termLength: "",
        rentAdjustments: ""
      },
      terminationOptions: {
        conditions: "",
        notice: ""
      },
      holdoverTerms: ""
    },
    rentStructure: {
      baseRent: {
        amount: 0,
        frequency: "Monthly"
      },
      rentEscalations: {
        type: "",
        amount: ""
      },
      additionalCharges: {
        cam: false,
        taxes: false,
        insurance: false,
        utilities: false
      },
      rentDueDate: "",
      lateFees: {
        percentage: 0,
        gracePeriod: 0
      },
      securityDeposit: 0,
      freeRentConcessions: {
        period: "",
        conditions: ""
      },
      percentageRent: {
        threshold: 0,
        percentage: 0
      }
    },
    operatingExpenses: {
      baseYear: "",
      expenseStop: 0,
      proRataShare: 0,
      camCap: {
        amount: 0,
        type: ""
      },
      insurance: {
        landlordResponsibilities: [],
        tenantResponsibilities: []
      },
      taxes: {
        responsibility: "",
        specialAssessments: ""
      },
      utilities: {
        type: "",
        responsibility: ""
      },
      auditRights: {
        period: "",
        conditions: ""
      }
    },
    maintenanceAndRepairs: {
      tenantResponsibilities: [],
      landlordResponsibilities: [],
      hvacMaintenance: {
        responsibility: "",
        frequency: ""
      },
      repairs: {
        tenant: [],
        landlord: []
      },
      alterations: {
        permittedChanges: "",
        approvalProcess: ""
      },
      restorationObligations: "",
      codeCompliance: ""
    },
    insurance: {
      tenant: {
        generalLiability: {
          perOccurrence: 0,
          aggregate: 0
        },
        propertyInsurance: false,
        businessInterruption: false,
        workersComp: false,
        additional: []
      },
      landlord: {
        propertyInsurance: false,
        liability: {
          coverage: 0
        }
      },
      waiverOfSubrogation: false,
      indemnification: ""
    },
    defaultAndRemedies: {
      tenantDefaults: [],
      curePeriod: 0,
      landlordRemedies: [],
      forceMajeure: "",
      disputeResolution: "",
      attorneyFees: ""
    },
    assignmentAndSublease: {
      assignmentRights: "",
      landlordConsent: "",
      subleasingTerms: "",
      coTenancy: {
        requirements: "",
        remedies: ""
      },
      rightOfFirstRefusal: {
        notice: "",
        terms: ""
      }
    },
    specialClauses: {
      relocationClause: "",
      expansionRights: "",
      signageRights: "",
      environmentalClauses: "",
      eminentDomain: "",
      landlordSale: "",
      brokerageFees: ""
    },
    additionalNotes: {
      keyDates: {},
      concessions: [],
      specialRights: [],
      documents: []
    }
  };
} 