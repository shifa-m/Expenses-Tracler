import { useEffect,useState } from "react";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, BarChart, Bar, XAxis, YAxis } from "recharts";
import api from "../api/axios.js"

const COLORS = ["#3F6C51", "#B5563C", "#8C8577", "#5E7CE2", "#D9A441", "#7A5C61"];

const MONTH_NAMES=["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];

const Dashboard=()=>{
            const [summary, setSummary] = useState(null);
            const [loading, setLoading] = useState(true);


            useEffect(()=>{
                        const fetchSummary=async()=>{
                                    try{
                                                const res=await api.get("/dashboard/summary")
                                                setSummary(res.data)

                                    }catch(error){
                                                console.log(error)

                                    }finally{
                                                setLoading(false)
                                    }
                        };
                        fetchSummary();
            },[]);

            if(loading) return <div className="max-w-5xl mx-auto px-6 py-10">Loading...</div>;

            const byMonthData=(summary?.byMonth||[]).map((m)=>({
                        name:`${MONTH_NAMES[m._id.month-1]} '${String(m._id.year).slice(2)}`,
                        total:m.total,
            }))

return (
    <div className="max-w-5xl mx-auto px-6 py-10">
      <h1 className="font-display text-3xl text-ink mb-1">Dashboard</h1>
      <p className="text-ink/60 text-sm mb-8">A quiet summary of where things went.</p>

      <div className="bg-white border border-mist rounded-lg p-6 mb-8">
        <p className="text-sm text-ink/60">Total spent</p>
        <p className="font-display text-4xl text-ink mt-1">
          ${summary?.total?.toFixed(2) || "0.00"}
        </p>
      </div>

      {summary?.byCategory?.length === 0 ? (
        <p className="text-ink/50 text-sm">Add some expenses to see your breakdown here.</p>
      ) : (
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-white border border-mist rounded-lg p-6">
            <h2 className="font-display text-lg text-ink mb-4">By category</h2>
            <ResponsiveContainer width="100%" height={240}>
              <PieChart>
                <Pie
                  data={summary.byCategory}
                  dataKey="total"
                  nameKey="category"
                  outerRadius={80}
                  label={(entry) => entry.category}
                >
                  {summary.byCategory.map((_, i) => (
                    <Cell key={i} fill={COLORS[i % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div className="bg-white border border-mist rounded-lg p-6">
            <h2 className="font-display text-lg text-ink mb-4">By month</h2>
            <ResponsiveContainer width="100%" height={240}>
              <BarChart data={byMonthData}>
                <XAxis dataKey="name" fontSize={12} />
                <YAxis fontSize={12} />
                <Tooltip />
                <Bar dataKey="total" fill="#3F6C51" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
