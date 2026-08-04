import { useEffect,useState } from "react";
import api from "../api/axios/js"

const Categories=()=>{

            const [categories, setCategories] = useState([])
            const [name, setName] = useState("")
            const [error, setError] = useState("")

            const fetchCategories=async()=>{
                        const res=await api.get("/categories")
                        setCategories(res.data.categories)
            }

            useEffect(()=>{
                        fetchCategories();
            },[])

            const handleAdd=(e)=>{
                        e.preventDefault();
                        setError("")
                        try{
                                    await api.post("/categories",{name})
                                    setName("");
                                    fetchCategories()
                        }catch(err){

                                    setError(err.response?.data?.message||"Could add not category")

                        }

            }

            const handledelete=()=>{
                        await api.delete(`/categories/${id}`)
                        fetchCategories()
            }


 return (
    <div className="max-w-2xl mx-auto px-6 py-10">
      <h1 className="font-display text-3xl text-ink mb-1">Categories</h1>
      <p className="text-ink/60 text-sm mb-8">Organize expenses however makes sense to you.</p>

      <form onSubmit={handleAdd} className="flex gap-2 mb-6">
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="e.g. Groceries"
          required
          className="flex-1 px-3 py-2 border border-mist rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-moss/40"
        />
        <button type="submit" className="bg-moss text-white px-4 py-2 rounded-md hover:bg-moss/90">
          Add
        </button>
      </form>

      {error && <p className="text-clay text-sm mb-4">{error}</p>}

      <ul className="space-y-2">
        {categories.map((cat) => (
          <li
            key={cat._id}
            className="flex justify-between items-center bg-white border border-mist rounded-md px-4 py-3"
          >
            <span className="text-ink">{cat.name}</span>
            <button
              onClick={() => handleDelete(cat._id)}
              className="text-clay text-sm hover:underline"
            >
              Delete
            </button>
          </li>
        ))}
        {categories.length === 0 && (
          <p className="text-ink/50 text-sm">No categories yet. Add your first one above.</p>
        )}
      </ul>
    </div>
  );
};

export default Categories;
