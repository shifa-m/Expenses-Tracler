import { useEffect,useState } from "react";
import api from "../api/axios.js"

const Expenses=()=>{
            const [expenses, setExpenses] = useState("")
            const [categories, setCategories] = useState("")
            const [pagination, setPagination] = useState("")
            const [form, setForm] = useState({amount:"",category:"",description:"",date:""})
            const [error, setError] = useState("")


const fetchCategories=async()=>{
            const res=await api.get("/categories")
            setCategories(res.data.categories)
};

const fetchExpenses=async(page=1)=>{

            const res=await api.get(`/expenses?page=${page}&limit=10`);
            setExpenses(res.data.expenses)
            setPagination(res.data.pagination)
}

useEffect(()=>{
            fetchCategories();
            fetchExpenses()
},[])

const handleAdd=async(e)=>{
            e.preventDefault();
            setError("");
            if(!form.category){
                        setError("Pick a category first-add one on the Categories page if the list is empty.")
                        return

            }

            try{
                        await api.post("/expenses",form)
                        setForm({amount:"",category:"",description:"",date:""})
                        fetchExpenses(pagination.page)
            }catch(err){
                              setError(err.response?.data?.message || "Could not add expense");

            }

            const handleDelete=async()=>{
                        await api.delete(`/expenses/${id}`);
                        fetchExpenses(pagination.page)
            }
}






 return (
    <div className="max-w-3xl mx-auto px-6 py-10">
      <h1 className="font-display text-3xl text-ink mb-1">Expenses</h1>
      <p className="text-ink/60 text-sm mb-8">Every entry, in one place.</p>

      <form onSubmit={handleAdd} className="bg-white border border-mist rounded-lg p-5 mb-8 grid gap-3 sm:grid-cols-2">
        <input
          type="number"
          step="0.01"
          placeholder="Amount"
          value={form.amount}
          onChange={(e) => setForm({ ...form, amount: e.target.value })}
          required
          className="px-3 py-2 border border-mist rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-moss/40"
        />
        <select
          value={form.category}
          onChange={(e) => setForm({ ...form, category: e.target.value })}
          className="px-3 py-2 border border-mist rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-moss/40"
        >
          <option value="">Select category</option>
          {categories.map((c) => (
            <option key={c._id} value={c._id}>{c.name}</option>
          ))}
        </select>
        <input
          type="text"
          placeholder="Description (optional)"
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
          className="px-3 py-2 border border-mist rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-moss/40"
        />
        <input
          type="date"
          value={form.date}
          onChange={(e) => setForm({ ...form, date: e.target.value })}
          className="px-3 py-2 border border-mist rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-moss/40"
        />
        {error && <p className="text-clay text-sm sm:col-span-2">{error}</p>}
        <button
          type="submit"
          className="sm:col-span-2 bg-moss text-white py-2 rounded-md hover:bg-moss/90"
        >
          Add expense
        </button>
      </form>

      <ul className="space-y-2 mb-6">
        {expenses.map((exp) => (
          <li
            key={exp._id}
            className="flex justify-between items-center bg-white border border-mist rounded-md px-4 py-3"
          >
            <div>
              <p className="text-ink">{exp.description || "(no description)"}</p>
              <p className="text-xs text-ink/50">
                {exp.category?.name || "Uncategorized"} · {new Date(exp.date).toLocaleDateString()}
              </p>
            </div>
            <div className="flex items-center gap-4">
              <span className="font-display text-ink">${exp.amount.toFixed(2)}</span>
              <button
                onClick={() => handleDelete(exp._id)}
                className="text-clay text-sm hover:underline"
              >
                Delete
              </button>
            </div>
          </li>
        ))}
        {expenses.length === 0 && (
          <p className="text-ink/50 text-sm">No expenses yet. Add your first one above.</p>
        )}
      </ul>

      {pagination.totalPages > 1 && (
        <div className="flex gap-2 text-sm">
          {Array.from({ length: pagination.totalPages }, (_, i) => i + 1).map((p) => (
            <button
              key={p}
              onClick={() => fetchExpenses(p)}
              className={`px-3 py-1 rounded-md border ${
                p === pagination.page ? "bg-moss text-white border-moss" : "border-mist text-ink"
              }`}
            >
              {p}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default Expenses;

