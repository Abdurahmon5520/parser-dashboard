import axios from "axios"
import { useQuery } from "@tanstack/react-query"

type Product = {
  id: number
  title: string
  price: string
  link: string
  image: string
}

export default function App() {
  const { data, isLoading, refetch, isFetching } = useQuery<Product[]>({
    queryKey: ["products"],
    queryFn: async () => {
      const res = await axios.get("http://127.0.0.1:8000/products")
      return res.data
    },
  })

  const runParser = async () => {
    await axios.get("http://127.0.0.1:8000/parse")
    refetch()
  }

  return (
    <div className="min-h-screen bg-zinc-100">
      <div className="max-w-7xl mx-auto p-10">

        {/* HEADER */}
        <div className="flex items-start md:items-center justify-between mb-10 flex-col md:flex-row gap-4">
          <div>
            <h1 className="text-4xl font-bold tracking-tight">
              UPG Parser Dashboard
            </h1>
            <p className="text-zinc-500 mt-1">
              UPG Products Monitoring System
            </p>
          </div>

          <button
            onClick={runParser}
            className="
              bg-black text-white
              px-6 py-3
              rounded-2xl
              hover:scale-[1.02]
              active:scale-[0.98]
              transition
              font-medium
            "
          >
            {isFetching ? "Updating..." : "Run Parser"}
          </button>
        </div>

        {/* LOADING */}
        {isLoading && (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {Array.from({ length: 6 }).map((_, i) => (
              <div
                key={i}
                className="bg-white rounded-3xl p-6 animate-pulse"
              >
                <div className="h-56 bg-zinc-200 rounded-2xl mb-4" />
                <div className="h-4 bg-zinc-200 rounded w-3/4 mb-3" />
                <div className="h-6 bg-zinc-200 rounded w-1/2" />
              </div>
            ))}
          </div>
        )}

        {/* EMPTY STATE */}
        {!isLoading && data?.length === 0 && (
          <div className="text-center text-zinc-500 mt-20">
            No products found. Run parser 🚀
          </div>
        )}

        {/* GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {data?.map((product) => (
            <div
              key={product.id}
              className="
                bg-white
                rounded-3xl
                overflow-hidden
                shadow-sm
                border border-zinc-200
                hover:shadow-xl
                transition
                flex flex-col
              "
            >
              {/* IMAGE */}
              <div className="h-56 bg-zinc-50 flex items-center justify-center">
                {product.image ? (
                  <img
                    src={product.image}
                    alt={product.title}
                    className="h-full w-full object-contain p-4"
                  />
                ) : (
                  <span className="text-zinc-400">No image</span>
                )}
              </div>

              {/* CONTENT */}
              <div className="p-6 flex flex-col flex-1">
                <h2 className="text-lg font-semibold line-clamp-2 mb-3">
                  {product.title}
                </h2>

                <p className="text-2xl font-bold text-black mb-4">
                  {product.price}
                </p>

                <div className="mt-auto flex gap-3">
                  <a
                    href={product.link}
                    target="_blank"
                    className="
                      flex-1 text-center
                      bg-blue-600 text-white
                      py-2 rounded-xl
                      hover:bg-blue-700
                      transition
                    "
                  >
                    Open
                  </a>
                  {/* 
                  <button
                    className="
                      px-4 py-2
                      border border-zinc-300
                      rounded-xl
                      hover:bg-zinc-100
                      transition
                    "
                  >
                    ♥
                  </button> */}
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  )
}