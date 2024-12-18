import prisma from "@/app/lib/prisma"; // Adjust this import according to your setup
import bcrypt from "bcryptjs"; // Import bcrypt for password hashing
import jwt from "jsonwebtoken"; // Import jsonwebtoken for JWT generation

// Secret key for JWT (make sure to store this securely in production, e.g., in environment variables)
const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key"; // For development, use a temporary secret key

export async function POST(req) {
  try {
    // Parse the incoming request body
    const { email, password } = await req.json();

    // Validate the input
    if (!email || !password) {
      return new Response(
        JSON.stringify({ error: "Email and password are required" }),
        { status: 400 }
      );
    }

    // Find the user by email
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      return new Response(
        JSON.stringify({ error: "Invalid email or password" }),
        { status: 401 }
      );
    }

    // Compare the provided password with the hashed password in the database
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return new Response(
        JSON.stringify({ error: "Invalid email or password" }),
        { status: 401 }
      );
    }

    // Generate a JWT token
    const token = jwt.sign(
      { userId: user.id, email: user.email, username: user.username }, // Payload
      JWT_SECRET, // Secret key
      { expiresIn: "1h" } // Token expiration time (e.g., 1 hour)
    );

    // Respond with success message and the generated JWT token
    return new Response(
      JSON.stringify({
        message: "Login successful",
        user: {
          id: user.id,
          email: user.email,
          username: user.username,
          admin: user.admin,
        },
        token, // Include the JWT token in the response
      }),
      { status: 200 }
    );
  } catch (error) {
    console.log(error.message);
    return new Response(
      JSON.stringify({ error: "Failed to log in. Please try again." }),
      { status: 500 }
    );
  }
}
