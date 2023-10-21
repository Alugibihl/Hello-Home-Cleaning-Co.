

export async function GET(request) {
    // console.log("USER ROUTE ")
    const {name, email} = await request.json();
    await connectMongoDB();
    await User.create({ name, email });
    return NextResponse.json({ message: "User Registered "}, {status: 201});
};
