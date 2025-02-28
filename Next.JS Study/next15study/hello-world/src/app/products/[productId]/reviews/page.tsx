export default async function ProductReviews({
    params
}: {
    params: Promise<{ productId: string }>;
}) {
    const { productId } = await params;
    return (
        <div>
            <h1>Reviews for {productId}</h1>
        </div>
    );
}
