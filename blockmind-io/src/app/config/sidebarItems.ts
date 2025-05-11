export type UserRole = 'student' | 'lecturer' | 'admin';

interface SidebarItem {
  title: string;
  url: string;
  icon: keyof typeof LucideIcons; // Now a string representing the icon name
  userRoles: UserRole[];
}
// Import all icons at once
import * as LucideIcons from "lucide-react";


export const sidebarItems: SidebarItem[] = [
  // Common Items
  {
    title: 'Dashboard',
    url: '/dashboard',
    icon: 'LayoutDashboard',
    userRoles: ['student', 'lecturer', 'admin']
  },
  {
    title: 'Profile',
    url: '/profile',
    icon: 'User',
    userRoles: ['student', 'lecturer', 'admin']
  },
  {
    title: 'Notifications',
    url: '/notifications',
    icon: 'Bell',
    userRoles: ['student', 'lecturer', 'admin']
  },
  {
    title: 'Settings',
    url: '/settings',
    icon: 'Settings',
    userRoles: ['student', 'lecturer', 'admin']
  },
  {
    title: 'Logout',
    url: '/logout',
    icon: 'LogOut',
    userRoles: ['student', 'lecturer', 'admin']
  },

  // Student Specific
  {
    title: 'My Courses',
    url: '/my-courses',
    icon: 'BookOpen',
    userRoles: ['student']
  },
  {
    title: 'Grades',
    url: '/grades',
    icon: 'Award',
    userRoles: ['student']
  },
  {
    title: 'History',
    url: '/attendance-history',
    icon: 'CalendarCheck',
    userRoles: ['student']
  },
  {
    title: 'Submissions',
    url: '/assignments',
    icon: 'ClipboardList',
    userRoles: ['student']
  },
  {
    title: 'Results',
    url: '/exam-results',
    icon: 'FileText',
    userRoles: ['student']
  },
  {
    title: 'Certificate Vault',
    url: '/certificates',
    icon: 'FileSpreadsheet',
    userRoles: ['student']
  },
  {
    title: 'Rewards & BlocTokens',
    url: '/rewards',
    icon: 'Gift',
    userRoles: ['student']
  },
  {
    title: 'Chat with Lecturers',
    url: '/chat',
    icon: 'MessageSquare',
    userRoles: ['student']
  },
  {
    title: 'Support & Help',
    url: '/support',
    icon: 'HelpCircle',
    userRoles: ['student']
  },

  // Lecturer Specific
  {
    title: 'My Courses',
    url: '/lecturer-courses',
    icon: 'BookOpen',
    userRoles: ['lecturer']
  },
  {
    title: 'Submit Course Marks',
    url: '/submit-marks',
    icon: 'FileInput',
    userRoles: ['lecturer']
  },
  {
    title: 'Student Attendance Tracker',
    url: '/attendance-tracker',
    icon: 'CalendarCheck',
    userRoles: ['lecturer']
  },
  {
    title: 'Assignments & Grading',
    url: '/assignment-grading',
    icon: 'ClipboardList',
    userRoles: ['lecturer']
  },
  {
    title: 'Exams & Results Management',
    url: '/exam-management',
    icon: 'FileText',
    userRoles: ['lecturer']
  },
  {
    title: 'Class Schedules & Timetables',
    url: '/timetables',
    icon: 'Clock',
    userRoles: ['lecturer']
  },
  {
    title: 'Chat with Students',
    url: '/lecturer-chat',
    icon: 'MessageSquare',
    userRoles: ['lecturer']
  },
  {
    title: 'Upload Study Material',
    url: '/upload-materials',
    icon: 'Upload',
    userRoles: ['lecturer']
  },
  {
    title: 'Analytics & Reports',
    url: '/lecturer-analytics',
    icon: 'PieChart',
    userRoles: ['lecturer']
  },

  // Admin Specific
  {
    title: 'Student Management',
    url: '/student-management',
    icon: 'Users',
    userRoles: ['admin']
  },
  {
    title: 'Lecturer Management',
    url: '/lecturer-management',
    icon: 'Users',
    userRoles: ['admin']
  },
  {
    title: 'Course Management',
    url: '/course-management',
    icon: 'BookOpen',
    userRoles: ['admin']
  },
  {
    title: 'Exams & Results',
    url: '/admin-exams',
    icon: 'FileText',
    userRoles: ['admin']
  },
  {
    title: 'Issue Certificates',
    url: '/issue-certificates',
    icon: 'FileSignature',
    userRoles: ['admin']
  },
  {
    title: 'Rewards Management',
    url: '/rewards-management',
    icon: 'Gift',
    userRoles: ['admin']
  },
  {
    title: 'Blockchain Audit Logs',
    url: '/blockchain-logs',
    icon: 'FileSearch',
    userRoles: ['admin']
  },
  {
    title: 'Attendance Verification',
    url: '/attendance-verification',
    icon: 'CalendarCheck',
    userRoles: ['admin']
  },
  {
    title: 'DAO Governance',
    url: '/dao-governance',
    icon: 'ShieldCheck',
    userRoles: ['admin']
  },
  {
    title: 'System Logs & Analytics',
    url: '/system-analytics',
    icon: 'BarChart2',
    userRoles: ['admin']
  },
  {
    title: 'Support & Help',
    url: '/admin-support',
    icon: 'HelpCircle',
    userRoles: ['admin']
  }
];