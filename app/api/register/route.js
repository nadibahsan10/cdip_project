// app/api/register/route.js
import prisma from "@/app/lib/prisma"; // Adjust this import according to your setup
import bcrypt from "bcryptjs"; // Import bcrypt for password hashing
import jwt from "jsonwebtoken"; // Import jsonwebtoken for JWT generation

// Secret key for JWT (make sure to store this securely in production, e.g., in environment variables)
const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key"; // For development use a temporary secret key

// Email validation regex (basic format validation)
const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

export async function POST(req) {
  try {
    // Parse the incoming request body
    const { email, username, password } = await req.json();

    // Email validation
    if (!emailRegex.test(email)) {
      return new Response(JSON.stringify({ error: "Invalid email format" }), {
        status: 400,
      });
    }

    // Check if the email already exists
    const existingUserByEmail = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUserByEmail) {
      return new Response(
        JSON.stringify({ error: "Email already registered" }),
        { status: 400 }
      );
    }

    // Check if the username already exists
    const existingUserByUsername = await prisma.user.findUnique({
      where: { username },
    });

    if (existingUserByUsername) {
      return new Response(JSON.stringify({ error: "Username already taken" }), {
        status: 400,
      });
    }

    // Hash the password before saving it
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user in the database
    const user = await prisma.user.create({
      data: {
        email,
        username,
        password: hashedPassword, // Store the hashed password
      },
    });

    // Generate JWT token
    const token = jwt.sign(
      { userId: user.id, email: user.email, username: user.username }, // Payload
      JWT_SECRET, // Secret key
      { expiresIn: "1h" } // Token expiration time (e.g., 1 hour)
    );

    // Respond with success message and the generated JWT token
    return new Response(
      JSON.stringify({
        message: "User registered successfully",
        user,
        token, // Include the JWT token in the response
      }),
      { status: 201 }
    );
  } catch (error) {
    console.log(error.message);
    return new Response(JSON.stringify({ error: "Failed to register user" }), {
      status: 500,
    });
  }
}
