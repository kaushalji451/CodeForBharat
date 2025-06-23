
export default async function CandidateNavigate(id) {
    console.log(id);
   let navigate ="";
    if(!id){
        console.error("Candidate ID is required for navigation.");
        return;
    }
    let data = await fetch(`${import.meta.env.VITE_API_URL}/candidates/${id}`);
    let result = await data.json();
    if(result.score){
        navigate = "/candidateDashboard";
    }else{
        navigate = "/assessment";
    }
    return navigate;
}