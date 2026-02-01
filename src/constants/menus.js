export const ROLES = {
  ADMIN: "ADMIN",
  DOCTOR: "DOCTOR",
  LABORANT: "LABORANT",
};

export const hasRole = (userRole, requiredRole) => {
  return userRole === requiredRole;
};

export const hasAnyRole = (userRole, roles) => {
  return roles.includes(userRole);
};

export const PERMISSIONS = {
  [ROLES.ADMIN]: {
    canManageUsers: true,
    canManagePatients: true,
    canDeletePatients: true,
    canManageTestCategories: true,
    canManageTestPanels: true,
    canCreateTestResults: true,
    canViewTestResults: true,
    canDeleteTestResults: true,
    canViewDashboard: true,
  },
  [ROLES.DOCTOR]: {
    canManageUsers: false,
    canManagePatients: false,
    canDeletePatients: false,
    canManageTestCategories: false,
    canManageTestPanels: false,
    canCreateTestResults: true,
    canViewTestResults: true,
    canDeleteTestResults: false,
    canViewDashboard: true,
  },
  [ROLES.LABORANT]: {
    canManageUsers: false,
    canManagePatients: true,
    canDeletePatients: false,
    canManageTestCategories: false,
    canManageTestPanels: false,
    canCreateTestResults: true,
    canViewTestResults: true,
    canDeleteTestResults: false,
    canViewDashboard: true,
  },
};

export const hasPermission = (userRole, permission) => {
  return PERMISSIONS[userRole]?.[permission] || false;
};

export const getMenuForCurrentContext = () => {
  const user = JSON.parse(localStorage.getItem("user") || "null");
  const userRole = user?.role;

  switch (userRole) {
    case ROLES.ADMIN:
      return adminMenu;
    case ROLES.DOCTOR:
      return doctorMenu;
    case ROLES.LABORANT:
      return laborantMenu;
    default:
      return defaultMenu;
  }
};

const adminMenu = [
  {
    name: "dashboard",
    title: "Dashboard",
    icon: "ViewDashboard",
    group: "dashboard",
    url: "/dashboard",
  },
  {
    name: "patients",
    title: "Patients",
    icon: "AccountMultiple",
    group: "patients",
    submenu: [
      {
        name: "patients-list",
        title: "All Patients",
        group: "patients",
        url: "/patients",
      },
      {
        name: "patients-create",
        title: "Add Patient",
        group: "patients",
        url: "/patients/create",
      },
    ],
  },
  {
    name: "test-management",
    title: "Test Management",
    icon: "Flask",
    group: "test-management",
    submenu: [
      {
        name: "test-categories",
        title: "Test Categories",
        group: "test-management",
        url: "/tests/categories",
      },
      {
        name: "test-panels",
        title: "Test Panels",
        group: "test-management",
        url: "/tests/panels",
      },
    ],
  },
  {
    name: "test-results",
    title: "Test Results",
    icon: "ClipboardText",
    group: "test-results",
    submenu: [
      {
        name: "test-results-list",
        title: "All Results",
        group: "test-results",
        url: "/test-results",
      },
      {
        name: "test-results-create",
        title: "Add Result",
        group: "test-results",
        url: "/test-results/create",
      },
    ],
  },
  {
    name: "users",
    title: "Users",
    icon: "Account",
    group: "users",
    submenu: [
      {
        name: "users-list",
        title: "All Users",
        group: "users",
        url: "/users",
      },
      {
        name: "users-create",
        title: "Add User",
        group: "users",
        url: "/users/create",
      },
    ],
  },
  {
    name: "settings",
    title: "Settings",
    icon: "Cog",
    group: "settings",
    url: "/settings",
  },
];

const doctorMenu = [
  {
    name: "dashboard",
    title: "Dashboard",
    icon: "ViewDashboard",
    group: "dashboard",
    url: "/dashboard",
  },
  {
    name: "test-results",
    title: "Test Results",
    icon: "ClipboardText",
    group: "test-results",
    submenu: [
      {
        name: "test-results-list",
        title: "All Results",
        group: "test-results",
        url: "/test-results",
      },
      {
        name: "test-results-create",
        title: "Add Result",
        group: "test-results",
        url: "/test-results/create",
      },
    ],
  },
  {
    name: "settings",
    title: "Settings",
    icon: "Cog",
    group: "settings",
    url: "/settings",
  },
];

const laborantMenu = [
  {
    name: "dashboard",
    title: "Dashboard",
    icon: "ViewDashboard",
    group: "dashboard",
    url: "/dashboard",
  },
  {
    name: "patients",
    title: "Patients",
    icon: "AccountMultiple",
    group: "patients",
    submenu: [
      {
        name: "patients-list",
        title: "All Patients",
        group: "patients",
        url: "/patients",
      },
      {
        name: "patients-create",
        title: "Add Patient",
        group: "patients",
        url: "/patients/create",
      },
    ],
  },
  {
    name: "test-results",
    title: "Test Results",
    icon: "clipboard",
    group: "test-results",
    submenu: [
      {
        name: "test-results-list",
        title: "All Results",
        group: "test-results",
        url: "/test-results",
      },
      {
        name: "test-results-create",
        title: "Add Result",
        group: "test-results",
        url: "/test-results/create",
      },
    ],
  },
  {
    name: "settings",
    title: "Settings",
    icon: "settings",
    group: "settings",
    url: "/settings",
  },
];

const defaultMenu = [
  {
    name: "dashboard",
    title: "Dashboard",
    icon: "ViewDashboard",
    group: "dashboard",
    url: "/dashboard",
  },
  {
    name: "settings",
    title: "Settings",
    icon: "settings",
    group: "settings",
    url: "/settings",
  },
];
