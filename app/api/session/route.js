
export async function POST(request) {
    const {name, email} = await request.json();
    await connectMongoDB();
    await User.create({ name, email });
    return NextResponse.json(User, {status: 201});
};
