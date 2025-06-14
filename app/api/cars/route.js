// app/api/cars/route.js
import dbConnect from "@/lib/dbConnect";
import Car from "@/models/CarModel";

export async function POST(request) {
  try {
    await dbConnect();
    
    const body = await request.json();
    const newCar = await Car.create(body);
    
    return new Response(JSON.stringify(newCar), {
      status: 201,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }
}