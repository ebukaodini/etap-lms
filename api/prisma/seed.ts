import { PrismaClient, Role } from "@prisma/client";

const db = new PrismaClient();
const subjects = [
  {
    title: "Agile Software Development",
    description:
      "Agile methodologies focus on iterative development, collaboration, and flexibility to respond to change.",
    lessons: [
      {
        title: "Introduction to Agile",
        description: "Understanding the core principles and values of Agile.",
        videoLink: "https://www.youtube.com/watch?v=Z9QbYZh1YXY",
      },
      {
        title: "Scrum Framework",
        description:
          "Detailed overview of the Scrum framework, including roles, events, and artifacts.",
        videoLink: "https://www.youtube.com/watch?v=9TycLR0TqFA",
      },
      {
        title: "Agile vs Waterfall",
        description:
          "Comparison between Agile and traditional Waterfall project management approaches.",
        videoLink: "https://www.youtube.com/watch?v=5RocT_OdQcA",
      },
    ],
  },
  {
    title: "Digital Marketing",
    description:
      "Strategies and techniques for promoting products or services online.",
    lessons: [
      {
        title: "SEO Fundamentals",
        description:
          "Basics of Search Engine Optimization and how it improves website visibility.",
        videoLink: "https://www.youtube.com/watch?v=DvwS7cV9GmQ",
      },
      {
        title: "Social Media Marketing",
        description:
          "Using social media platforms to engage with audiences and promote brands.",
        videoLink: "https://www.youtube.com/watch?v=I2pwcAVonKI",
      },
      {
        title: "Email Marketing Essentials",
        description:
          "Crafting effective email campaigns to nurture leads and drive conversions.",
        videoLink: "https://www.youtube.com/watch?v=94gHaHKmD4Q",
      },
    ],
  },
  {
    title: "Data Science and Analytics",
    description:
      "Analyzing data to extract actionable insights for decision-making.",
    lessons: [
      {
        title: "Introduction to Data Science",
        description:
          "Overview of data science concepts, tools, and applications.",
        videoLink: "https://www.youtube.com/watch?v=ua-CiDNNj30",
      },
      {
        title: "Data Visualization with Python",
        description:
          "Techniques for visualizing data using Python libraries like Matplotlib and Seaborn.",
        videoLink: "https://www.youtube.com/watch?v=a9UrKTVEeZA",
      },
      {
        title: "Machine Learning Basics",
        description:
          "Introduction to machine learning algorithms and their real-world applications.",
        videoLink: "https://www.youtube.com/watch?v=GwIo3gDZCVQ",
      },
    ],
  },
  {
    title: "Financial Management",
    description:
      "Managing financial resources effectively within an organization.",
    lessons: [
      {
        title: "Financial Statements",
        description:
          "Understanding and analyzing balance sheets, income statements, and cash flow statements.",
        videoLink: "https://www.youtube.com/watch?v=Fi1wkUczuyk",
      },
      {
        title: "Budgeting and Forecasting",
        description: "Techniques for creating budgets and financial forecasts.",
        videoLink: "https://www.youtube.com/watch?v=AN-9OSduhnc",
      },
      {
        title: "Investment Basics",
        description:
          "Introduction to investment strategies and portfolio management.",
        videoLink: "https://www.youtube.com/watch?v=qIw-yFC-HNU",
      },
    ],
  },
  {
    title: "Cybersecurity",
    description: "Protecting computer systems and networks from cyber threats.",
    lessons: [
      {
        title: "Introduction to Cybersecurity",
        description:
          "Overview of the cybersecurity landscape, including common threats and defenses.",
        videoLink: "https://www.youtube.com/watch?v=z5nc9MDbvkw",
      },
      {
        title: "Network Security Fundamentals",
        description:
          "Understanding network security protocols and best practices.",
        videoLink: "https://www.youtube.com/watch?v=NQ1cvwEvh44",
      },
      {
        title: "Ethical Hacking",
        description: "Introduction to ethical hacking techniques and tools.",
        videoLink: "https://www.youtube.com/watch?v=fNzpcB7ODxQ",
      },
    ],
  },
  {
    title: "Project Management",
    description:
      "Techniques and methodologies for effectively planning, executing, and closing projects.",
    lessons: [
      {
        title: "Project Management Fundamentals",
        description:
          "Introduction to the basics of project management, including key concepts and terminology.",
        videoLink: "https://www.youtube.com/watch?v=KM3-H6PfTe0",
      },
      {
        title: "Risk Management in Projects",
        description:
          "Understanding how to identify, assess, and mitigate risks in projects.",
        videoLink: "https://www.youtube.com/watch?v=kXkVV7PFWgE",
      },
      {
        title: "Agile Project Management",
        description:
          "Exploring Agile methodologies and their application in managing projects.",
        videoLink: "https://www.youtube.com/watch?v=Z9QbYZh1YXY",
      },
    ],
  },
  {
    title: "Software Development",
    description:
      "The process of designing, coding, testing, and maintaining software applications.",
    lessons: [
      {
        title: "Introduction to Programming",
        description:
          "Basics of programming, including syntax, variables, and control structures.",
        videoLink: "https://www.youtube.com/watch?v=rfscVS0vtbw",
      },
      {
        title: "Object-Oriented Programming",
        description:
          "Concepts of object-oriented programming, including classes, objects, inheritance, and polymorphism.",
        videoLink: "https://www.youtube.com/watch?v=Z1Yd7upQsXY",
      },
      {
        title: "Version Control with Git",
        description:
          "Introduction to version control systems with a focus on Git.",
        videoLink: "https://www.youtube.com/watch?v=8JJ101D3knE",
      },
    ],
  },
  {
    title: "Business Analytics",
    description:
      "Using data and statistical methods to analyze business performance and make informed decisions.",
    lessons: [
      {
        title: "Introduction to Business Analytics",
        description:
          "Overview of business analytics and its role in decision-making.",
        videoLink: "https://www.youtube.com/watch?v=diaZdX1s5L4",
      },
      {
        title: "Data Visualization Techniques",
        description:
          "How to effectively visualize data to uncover insights and trends.",
        videoLink: "https://www.youtube.com/watch?v=loYuxWSsLNc",
      },
      {
        title: "Predictive Analytics",
        description:
          "Techniques for forecasting future trends and behaviors based on historical data.",
        videoLink: "https://www.youtube.com/watch?v=4y6fUC56KPw",
      },
    ],
  },
  {
    title: "Human Resources Management",
    description: "Managing and developing an organization's workforce.",
    lessons: [
      {
        title: "Recruitment and Selection",
        description:
          "Best practices for recruiting and selecting the right candidates for job roles.",
        videoLink: "https://www.youtube.com/watch?v=hHXlsJ2VQ70",
      },
      {
        title: "Employee Training and Development",
        description:
          "Strategies for employee training, professional development, and career advancement.",
        videoLink: "https://www.youtube.com/watch?v=ps09Fv_BCrw",
      },
      {
        title: "Performance Management",
        description:
          "Techniques for evaluating and improving employee performance.",
        videoLink: "https://www.youtube.com/watch?v=78VaoiL9FoI",
      },
    ],
  },
];

const users = [
  {
    firstName: "Jack",
    lastName: "Doe",
    email: "jack.doe@example.com",
    role: Role.ADMIN,
  },
  {
    firstName: "Jane",
    lastName: "Doe",
    email: "jane.doe@example.com",
    role: Role.TEACHER,
  },
  {
    firstName: "John",
    lastName: "Doe",
    email: "john.doe@example.com",
    role: Role.LEARNER,
  },
];

async function main() {
  try {
    // seed users
    users.forEach(async (user) => {
      await db.user.upsert({
        create: user,
        where: { email: user.email },
        update: {
          firstName: user.firstName,
          lastName: user.lastName,
          role: user.role,
        },
      });
    });

    // seed subjects and lessons
    subjects.forEach(async (subject) => {
      await db.subject.upsert({
        create: {
          title: subject.title,
          description: subject.description,
          lessons: {
            create: subject.lessons,
          },
        },
        where: { title: subject.title },
        update: {
          description: subject.description,
        },
      });
    });
  } catch (error) {
    console.error(error);
    await db.$disconnect();
  } finally {
    await db.$disconnect();
    console.log("Database seeded successfully!");
  }
}

main();
