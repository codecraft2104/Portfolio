const projects = [
  {
    id: 1,
    title: 'AI College Companion',
    slug: 'ai-college-companion',
    short_description: 'An AI-powered student companion designed to bring useful academic tools together in one application.',
    full_description: 'AI College Companion is a student-focused application that helps learners manage academic routines, access study materials, and receive AI-driven academic support. The product combines productivity features with a modern UI to support daily student workflows.',
    category: 'AI-powered education / Student productivity',
    cover_image: 'https://placehold.co/1200x700/1b102b/eadfff?text=AI+College+Companion',
    technologies: ['React', 'TypeScript', 'Supabase', 'AI APIs', 'Firebase'],
    problem_statement: 'Students often need to manage attendance, academic records, materials, and study prep in separate tools, making organization difficult.',
    objectives: ['Unify academic productivity tools', 'Enable quick study review and practice', 'Support exam preparation with reminders and AI assistance'],
    features: ['Attendance tracking', 'SGPA and CGPA calculation', 'Study materials management', 'AI-powered study assistance', 'AI-generated MCQs', 'Exam countdown', 'Notifications'],
    architecture: 'Frontend experience built with React and TypeScript, with a data layer supported by Firebase/Supabase and optional AI-backed APIs for dynamic study features.',
    my_role: 'I worked on planning the product experience, authoring key user flows, and architecting the frontend and data model for academic functionality.',
    challenges: ['Combining academic features without cluttering the UX', 'Balancing automation with clear, understandable workflows', 'Handling real-world academic data in a simple interface'],
    solutions: ['Modular feature architecture', 'Clear dashboards for core student tasks', 'AI-generated practice content and reminders for daily use'],
    results: ['A streamlined student workspace', 'Better visibility into academic responsibilities', 'Practical learning support in one place'],
    future_improvements: ['Add deeper personalization for individual learning paths', 'Support offline study access', 'Expand analytics and recommendations'],
    github_url: 'https://github.com/codecraft2104',
    live_demo_url: null,
    featured: true,
    sort_order: 1,
    screenshots: [
      { title: 'Dashboard', url: 'https://placehold.co/1200x800/1b102b/eadfff?text=Dashboard', alt: 'AI College Companion dashboard placeholder' },
      { title: 'Planner', url: 'https://placehold.co/1200x800/1b102b/c4b5fd?text=Planner', alt: 'Academic planner placeholder' }
    ]
  },
  {
    id: 2,
    title: 'Chat Application',
    slug: 'chat-application',
    short_description: 'A web-based chat application designed to let users communicate through a convenient interface.',
    full_description: 'The chat application is built to support real-time communication, user authentication, and organized messaging workflows. The project focuses on a clear user experience with persistent conversations and responsive layouts.',
    category: 'Real-time communication',
    cover_image: 'https://placehold.co/1200x700/0f172a/9ad3ff?text=Chat+Application',
    technologies: ['React', 'Node.js', 'Express', 'MySQL', 'Socket.IO'],
    problem_statement: 'Users need a fast, reliable communication tool that keeps messages organized and easy to access across sessions.',
    objectives: ['Create a secure chat experience', 'Support real-time message updates', 'Allow clear user authentication and access control'],
    features: ['Authentication', 'Instant messaging', 'Conversation history', 'User profiles', 'Responsive interface'],
    architecture: 'Client application talks to an Express API, while data persisted in MySQL and real-time communication is handled with a lightweight event layer.',
    my_role: 'I handled the planning of the authentication flow, message data model, and responsive frontend experience for interactive communication.',
    challenges: ['Syncing real-time updates', 'Maintaining clean message state', 'Ensuring responsive behavior across devices'],
    solutions: ['Structured message storage', 'Simple event-driven communication', 'Responsive and accessible UI patterns'],
    results: ['A clean communication flow', 'Reliable data persistence', 'Easy-to-use interface for messaging'],
    future_improvements: ['Add typing indicators', 'Add file upload support', 'Add presence and read receipts'],
    github_url: 'https://github.com/codecraft2104',
    live_demo_url: null,
    featured: true,
    sort_order: 2,
    screenshots: [
      { title: 'Messaging UI', url: 'https://placehold.co/1200x800/0f172a/9ad3ff?text=Messaging', alt: 'Chat interface placeholder' }
    ]
  },
  {
    id: 3,
    title: 'Courier Management System',
    slug: 'courier-management-system',
    short_description: 'A courier management application intended to organize shipment information and streamline courier-related operations.',
    full_description: 'The Courier Management System is designed to help manage parcel records, shipment status, and customer operations in a structured way. It brings the main delivery workflow into one place so operations are easier to track.',
    category: 'Management software',
    cover_image: 'https://placehold.co/1200x700/171f2e/e7d7ff?text=Courier+System',
    technologies: ['Java', 'Spring Boot', 'MySQL', 'Hibernate', 'REST APIs'],
    problem_statement: 'Courier operations often rely on fragmented manual records, making status tracking and task coordination difficult.',
    objectives: ['Organize shipment lifecycle tracking', 'Improve visibility of parcel data', 'Support status-driven business workflows'],
    features: ['Parcel records', 'Tracking', 'Customer management', 'Status updates', 'Reporting'],
    architecture: 'The service layer coordinates data access and shipment workflows, while MySQL stores operational records for updates and retrieval.',
    my_role: 'I focused on backend workflow design and a clean data model that can support status updates and operational reporting.',
    challenges: ['Modeling operational flow clearly', 'Supporting multiple statuses without confusion', 'Staying flexible for future workflow additions'],
    solutions: ['Normalized service data', 'Trackable shipment state', 'Clear operational structure for business workflows'],
    results: ['Improved visibility for shipping operations', 'Organized parcel management', 'Better support for operational continuity'],
    future_improvements: ['Add analytics dashboards', 'Add exportable reports', 'Add delivery route optimization'],
    github_url: 'https://github.com/codecraft2104',
    live_demo_url: null,
    featured: false,
    sort_order: 3,
    screenshots: [
      { title: 'Courier overview', url: 'https://placehold.co/1200x800/171f2e/e7d7ff?text=Courier+Overview', alt: 'Courier dashboard placeholder' }
    ]
  }
];

module.exports = { projects };
