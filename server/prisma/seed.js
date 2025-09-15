import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Starting database seed...");

  // Create a demo user
  const hashedPassword = await bcrypt.hash("password123", 10);

  const user = await prisma.user.upsert({
    where: { email: "demo@finexp.com" },
    update: {},
    create: {
      email: "demo@finexp.com",
      name: "Demo User",
      passwordHash: hashedPassword,
    },
  });

  console.log("✅ Created demo user:", user.email);

  // Create default categories for the demo user
  const defaultCategories = [
    { name: "Food & Dining", color: "#FF6B6B", icon: "🍽️" },
    { name: "Transportation", color: "#4ECDC4", icon: "🚗" },
    { name: "Shopping", color: "#45B7D1", icon: "🛍️" },
    { name: "Entertainment", color: "#96CEB4", icon: "🎬" },
    { name: "Bills & Utilities", color: "#FFEAA7", icon: "💡" },
    { name: "Healthcare", color: "#DDA0DD", icon: "🏥" },
    { name: "Education", color: "#98D8C8", icon: "📚" },
    { name: "Travel", color: "#F7DC6F", icon: "✈️" },
    { name: "Income", color: "#82E0AA", icon: "💰" },
    { name: "Other", color: "#BB8FCE", icon: "📦" },
  ];

  for (const categoryData of defaultCategories) {
    const existingCategory = await prisma.category.findFirst({
      where: {
        name: categoryData.name,
        userId: user.id,
      },
    });

    if (!existingCategory) {
      const category = await prisma.category.create({
        data: {
          ...categoryData,
          userId: user.id,
          isDefault: true,
        },
      });
      console.log("✅ Created category:", category.name);
    } else {
      console.log("✅ Category already exists:", categoryData.name);
    }
  }

  // Get categories for creating transactions and budgets
  const categories = await prisma.category.findMany({
    where: { userId: user.id },
  });

  const foodCategory = categories.find((c) => c.name === "Food & Dining");
  const transportCategory = categories.find((c) => c.name === "Transportation");
  const shoppingCategory = categories.find((c) => c.name === "Shopping");
  const incomeCategory = categories.find((c) => c.name === "Income");

  // Create sample transactions for the current month
  const now = new Date();
  const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
  const endOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0);

  const sampleTransactions = [
    // Income
    {
      amount: 5000,
      type: "INCOME",
      description: "Salary",
      categoryId: incomeCategory.id,
      date: new Date(now.getFullYear(), now.getMonth(), 1),
    },
    {
      amount: 200,
      type: "INCOME",
      description: "Freelance work",
      categoryId: incomeCategory.id,
      date: new Date(now.getFullYear(), now.getMonth(), 15),
    },

    // Expenses
    {
      amount: 150,
      type: "EXPENSE",
      description: "Grocery shopping",
      categoryId: foodCategory.id,
      date: new Date(now.getFullYear(), now.getMonth(), 2),
    },
    {
      amount: 45,
      type: "EXPENSE",
      description: "Restaurant dinner",
      categoryId: foodCategory.id,
      date: new Date(now.getFullYear(), now.getMonth(), 5),
    },
    {
      amount: 80,
      type: "EXPENSE",
      description: "Gas",
      categoryId: transportCategory.id,
      date: new Date(now.getFullYear(), now.getMonth(), 3),
    },
    {
      amount: 120,
      type: "EXPENSE",
      description: "Online shopping",
      categoryId: shoppingCategory.id,
      date: new Date(now.getFullYear(), now.getMonth(), 8),
    },
    {
      amount: 25,
      type: "EXPENSE",
      description: "Coffee",
      categoryId: foodCategory.id,
      date: new Date(now.getFullYear(), now.getMonth(), 10),
    },
    {
      amount: 60,
      type: "EXPENSE",
      description: "Public transport",
      categoryId: transportCategory.id,
      date: new Date(now.getFullYear(), now.getMonth(), 12),
    },
    {
      amount: 200,
      type: "EXPENSE",
      description: "Clothing",
      categoryId: shoppingCategory.id,
      date: new Date(now.getFullYear(), now.getMonth(), 18),
    },
    {
      amount: 90,
      type: "EXPENSE",
      description: "Grocery shopping",
      categoryId: foodCategory.id,
      date: new Date(now.getFullYear(), now.getMonth(), 20),
    },
  ];

  for (const transactionData of sampleTransactions) {
    const transaction = await prisma.transaction.create({
      data: {
        ...transactionData,
        userId: user.id,
      },
    });
    console.log("✅ Created transaction:", transaction.description);
  }

  // Create sample budgets
  const sampleBudgets = [
    {
      amount: 500,
      period: "MONTHLY",
      categoryId: foodCategory.id,
      startDate: startOfMonth,
      endDate: endOfMonth,
    },
    {
      amount: 200,
      period: "MONTHLY",
      categoryId: transportCategory.id,
      startDate: startOfMonth,
      endDate: endOfMonth,
    },
    {
      amount: 300,
      period: "MONTHLY",
      categoryId: shoppingCategory.id,
      startDate: startOfMonth,
      endDate: endOfMonth,
    },
  ];

  for (const budgetData of sampleBudgets) {
    const budget = await prisma.budget.create({
      data: {
        ...budgetData,
        userId: user.id,
      },
    });
    console.log("✅ Created budget for category:", budget.categoryId);
  }

  console.log("🎉 Database seed completed successfully!");
  console.log("\n📝 Demo Account Credentials:");
  console.log("Email: demo@finex.com");
  console.log("Password: password123");
}

main()
  .catch((e) => {
    console.error("❌ Seed failed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
