import axios from "axios"
import { useQuery } from "@tanstack/react-query"

type Product = {
  id: number
  title: string
  price: string
  link: string
}

export default function App() {

  const {
    data,
    isLoading,
    refetch,
  } = useQuery<Product[]>({
    queryKey: ["products"],
    queryFn: async () => {
      const res = await axios.get(
        "http://127.0.0.1:8000/products"
      )

      return res.data
    }
  })

  const runParser = async () => {
    await axios.get("http://127.0.0.1:8000/parse")
    refetch()
  }

  return (
    <div className="min-h-screen bg-zinc-100">

      <div className="max-w-7xl mx-auto p-10">

        <div className="flex items-center justify-between mb-10">

          <div>
            <h1 className="text-4xl font-bold">
              UPG Parser Dashboard
            </h1>

            <p className="text-zinc-500 mt-2">
              UPG Products Monitoring
            </p>
          </div>

          <button
            onClick={runParser}
            className="
              bg-black
              text-white
              px-6
              py-3
              rounded-2xl
              cursor-pointer
              hover:opacity-90
              transition
            "
          >
            Run Parser
          </button>

        </div>

        {isLoading && (
          <div className="text-xl">
            Loading...
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">

          {data?.map((product) => (
            <div
              key={product.id}
              className="
                bg-white
                rounded-3xl
                p-6
                shadow-sm
                border
                border-zinc-200
              "
            >

              <h2 className="text-xl font-semibold mb-4">
                {product.title}
              </h2>

              <p className="text-2xl font-bold mb-4">
                {product.price}
              </p>

              <a
                href={product.link}
                target="_blank"
                className="
                  text-blue-500
                  hover:underline
                "
              >
                Open Product
              </a>

            </div>
          ))}

        </div>

      </div>

    </div>
  )
}