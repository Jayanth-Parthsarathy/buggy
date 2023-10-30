import { Link } from "@/components/custom/dashboard/sidebar";

export const adminLinks: Link[] = [
  {
    text: "Home",
    href: "/",
  },
  {
    text: "Add Project",
    href: "/admin/projects/add",
  },
  {
    text: "Manage Projects",
    href: "/admin/projects",
  },
  {
    text: "Manage Tickets",
    href: "/admin/tickets",
  },
  {
    text: "Manage Members",
    href: "/admin/members",
  },
];


export const developerLinks: Link[] = [
  {
    text: "Home",
    href: "/",
  },
  {
    text: "My tickets",
    href: "/developer/tickets",
  },
];

export const testerLinks: Link[] = [
  {
    text: "Home",
    href: "/",
  },
  {
    text: "Test resolved tickets",
    href: "/tester/tickets",
  },
];

export const reporterLinks: Link[] = [
  {
    text: "Home",
    href: "/",
  },
  {
    text: "List projects",
    href: "/reporter/projects",
  },
  {
    text: "Report bugs",
    href: "/reporter/bugs",
  },
];

export const defaultLinks : Link[] = [
  {
    text: "Home",
    href: "/",
  },
  {
    text: "Login",
    href: "",
  },
  {
    text: "Logout",
    href: "",
  },
];
