import React, { useEffect, useState } from "react";
import { useAddSubscripctionPlanMutation, useDeleteSubscripctionPlanMutation, useGetSubscripctionPlansMutation, useUpdateSubscripctionPlanMutation } from "../../slices/adminApiSlice";
import { toast } from "react-toastify";
import Loader from "../user/Loader";
import Swal from "sweetalert2";
import { useDispatch, useSelector } from "react-redux";
import { SetSubscription } from "../../slices/SubscripctionSlice";

function AdminSubscriptions() {
  const  [planName,setPlanName]=useState()
  const [planPrice,setPlanPrice]=useState()
  const [planDuration,setPlanDuration]=useState()
  const [planFeatures,setPlanFeatures]=useState()
  const [subscripctions,setSubscripctions]=useState()
  const [addSubscriptionApi]=useAddSubscripctionPlanMutation()
  const [subscriptionsListApi,{isLoading}]=useGetSubscripctionPlansMutation()
  const [updateSubscriptionApi,{isLoading:isLoadingForUpdate}]=useUpdateSubscripctionPlanMutation()
  const [deleteSubscriptionApi]=useDeleteSubscripctionPlanMutation()
  const [editSubscriptionPlan, setEditSubscriptionPlan] = useState(null);
  const [maxInterests, setMaxInterests] = useState(); 
  const [maxShortlist, setMaxShortlist] = useState(); 





  useEffect(()=>{
    
   getSubscripction()
  },[])


  const [recommendations, setRecommendations] = useState([]);

const handleRecommendationChange = (recommendation) => {
  if (recommendations.includes(recommendation)) {
    setRecommendations(recommendations.filter((r) => r !== recommendation));
  } else {
    setRecommendations([...recommendations, recommendation]);
  }
};



  const handleMaxInterestsChange = (e) => {
    setMaxInterests(Number(e.target.value)); 
  };

  const handleMaxShortlistChange = (e) => {
    setMaxShortlist(Number(e.target.value)); 
  };



  const getSubscripction=async()=>{
    
    try {
      
      const res=await subscriptionsListApi().unwrap()
      
      setSubscripctions(res.subscriptionList)
  
    } catch (error) {
      console.log(error)
    }
  }


  
 
  const addSubscription = async() => {
    
    if (planName && planPrice && planDuration && planFeatures) {
    
      const featuresArray = planFeatures.split(/\n/).map((feature) => feature.trim());
      
      const newSubscription = {
        name: planName,
        price: planPrice,
        duration: planDuration,
        features: featuresArray,
        maxInterests,
        maxShortlist,
        recommendations
      };

      const res=await addSubscriptionApi(newSubscription).unwrap()
      if(res.success){

        toast.success(res.message)
        getSubscripction()
      }
      
      setPlanName("");
      setPlanPrice("");
      setPlanDuration("");
      setPlanFeatures("");
      document.getElementById('my_modal_1').close()
    } else {
      return toast.warn("Please fill in all the required fields.")
    }
  };
  
  const updateSubscription = async () => {
    if (editSubscriptionPlan && planName && planPrice && planDuration && planFeatures) {
      const featuresArray = planFeatures.split(/\n/).map((feature) => feature.trim());
      const updatedSubscription = {
        ...editSubscriptionPlan,
        name: planName,
        price: planPrice,
        duration: planDuration,
        features: featuresArray,
        maxInterests,
        maxShortlist,
        recommendations
      };
      
      const res = await updateSubscriptionApi(updatedSubscription).unwrap();
      
      if(res.success){
        toast.success(res.message)
        getSubscripction()
        document.getElementById('my_modal_2').close();
      }
      setPlanName("");
      setPlanPrice("");
      setPlanDuration("");
      setPlanFeatures("");
      
      setEditSubscriptionPlan(null);
    } else {
      return toast.warn("Please fill in all the required fields.");
    }
  }
  
  
  const deleteSubscription=async(planId)=>{
    
    try {

      const { value: confirmDelete } = await Swal.fire({
        title: "Confirm Delete",
        text: "Are you sure you want to delete this Plan?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Delete",
        cancelButtonText: "Cancel",
        confirmButtonColor: "#dc3545",
      });
      
      
      if(confirmDelete){
        
        const res= await deleteSubscriptionApi(planId).unwrap()
        
        if(res.success){
          toast.success(res.message)
          getSubscripction()
        }
      }
      
      
    } catch (error) {
      console.log(error)
    }
  }
  
 
  
  return (
    

    <div >


<button className="btn btn-neutral" onClick={() => document.getElementById('my_modal_1').showModal()}>Add Plan</button>
<dialog id="my_modal_1" className="modal">
  <div className="modal-box p-4 sm:p-6 md:p-8 lg:p-10 bg-slate-300">
    <h3 className="font-bold text-lg mb-4">Add a Subscription Plan</h3>
    <form method="dialog">
      <div className="mb-4">
        <label htmlFor="name">Name:</label>
        <input type="text" onChange={(e)=>setPlanName(e.target.value)} name="name" value={planName} id="name" required className="p-2 border rounded w-full" />
      </div>

      <div className="mb-4">
        <label htmlFor="price">Price:</label>
        <input type="number" name="price" id="price" value={planPrice} onChange={(e)=>setPlanPrice(e.target.value)} required className="p-2 border rounded w-full" />
      </div>

      <div className="mb-4">
        <label htmlFor="duration">Duration (in months):</label>
        <input type="number" name="duration" id="duration" value={planDuration} onChange={(e)=>setPlanDuration(e.target.value)} required className="p-2 border rounded w-full" />
      </div>

     <div className="mb-4">
  <label htmlFor="features">Features (one per line):</label>
  <textarea
    name="features"
    id="features"
    value={planFeatures}
    onChange={(e) => setPlanFeatures(e.target.value)}
    required
    className="p-2 border rounded w-full h-20"
  />
</div>


<div className="mb-4">
        <label htmlFor="maxInterests">Max Interests:</label>
        <input
          type="number"
          name="maxInterests"
          id="maxInterests"
          value={maxInterests}
          onChange={handleMaxInterestsChange}
          required
          className="p-2 border rounded w-full"
        />
      </div>

      <div className="mb-4">
        <label htmlFor="maxShortlist">Max Shortlist:</label>
        <input
          type="number"
          name="maxShortlist"
          id="maxShortlist"
          value={maxShortlist}
          onChange={handleMaxShortlistChange}
          required
          className="p-2 border rounded w-full"
        />
      </div>

      <div className="mb-4">
  <label>Recommendations:</label>
  <div>
    <input
      type="checkbox"
      id="qualificationRecommendation"
      name="qualificationRecommendation"
      checked={recommendations.includes("Qualifications")}
      className="checkbox checkbox-success mr-2"
      onChange={() => handleRecommendationChange("Qualifications")}
    />
    <label htmlFor="qualificationRecommendation">Based on Qualifications</label>
  </div>
  <div>
    <input
      type="checkbox"
      id="locationRecommendation"
      name="locationRecommendation"
      checked={recommendations.includes("Location")}
      className="checkbox checkbox-success mr-2"
      onChange={() => handleRecommendationChange("Location")}
    />
    <label htmlFor="locationRecommendation">Based on Location</label>
  </div>
  <div>
    <input
      type="checkbox"
      id="jobRecommendation"
      name="jobRecommendation"
      checked={recommendations.includes("Job")}
      className="checkbox checkbox-success mr-2"
      onChange={() => handleRecommendationChange("Job")}
    />
    <label htmlFor="jobRecommendation">Based on Job</label>
  </div>
  <div >
    <input
      type="checkbox"
      id="hobbiesRecommendation"
      name="hobbiesRecommendation"
      checked={recommendations.includes("Hobbies")}
      className="checkbox checkbox-success mr-2"
      onChange={() => handleRecommendationChange("Hobbies")}
    />
    <label htmlFor="hobbiesRecommendation">Based on Hobbies</label>
  </div>
</div>



      <div className="modal-action">
        <button type="button" className="btn" onClick={() => document.getElementById('my_modal_1').close()}>Close</button>
        <button type="button" className="btn btn-primary" onClick={addSubscription}>Add Subscription</button>
      </div>
    </form>
  </div>
</dialog>





<dialog id="my_modal_2" className="modal">
      <div className="modal-box p-4 sm:p-6 md:p-8 lg:p-10 bg-slate-300">
        <h3 className="font-bold text-lg mb-4">Edit Subscription Plan</h3>
        <form method="dialog">
          <div className="mb-4">
            <label htmlFor="name">Name:</label>
            <input
              type="text"
              onChange={(e) => setPlanName(e.target.value)}
              name="name"
              value={planName}
              id="name"
              required
              className="p-2 border rounded w-full"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="price">Price:</label>
            <input
              type="number"
              name="price"
              id="price"
              value={planPrice}
              onChange={(e) => setPlanPrice(e.target.value)}
              required
              className="p-2 border rounded w-full"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="duration">Duration (in months):</label>
            <input
              type="number"
              name="duration"
              id="duration"
              value={planDuration}
              onChange={(e) => setPlanDuration(e.target.value)}
              required
              className="p-2 border rounded w-full"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="features">Features (one per line):</label>
            <textarea
              name="features"
              id="features"
              value={planFeatures}
              onChange={(e) => setPlanFeatures(e.target.value)}
              required
              className="p-2 border rounded w-full h-20"
            />
          </div>

          <div className="mb-4">
        <label htmlFor="maxInterests">Max Interests:</label>
        <input
          type="number"
          name="maxInterests"
          id="maxInterests"
          value={maxInterests}
          onChange={handleMaxInterestsChange}
          required
          className="p-2 border rounded w-full"
        />
      </div>

      <div className="mb-4">
        <label htmlFor="maxShortlist">Max Shortlist:</label>
        <input
          type="number"
          name="maxShortlist"
          id="maxShortlist"
          value={maxShortlist}
          onChange={handleMaxShortlistChange}
          required
          className="p-2 border rounded w-full"
        />
      </div>


      <div className="mb-4">
  <label>Recommendations:</label>
  <div>
    <input
      type="checkbox"
      id="qualificationRecommendation"
      name="qualificationRecommendation"
      checked={recommendations.includes("Qualifications")}
      onChange={() => handleRecommendationChange("Qualifications")}
      className="checkbox checkbox-success mr-2"
    />
    <label htmlFor="qualificationRecommendation">Based on Qualifications</label>
  </div>
  <div>
    <input
      type="checkbox"
      id="locationRecommendation"
      name="locationRecommendation"
      checked={recommendations.includes("Location")}
      onChange={() => handleRecommendationChange("Location")}
      className="checkbox checkbox-success mr-2"
    />
    <label htmlFor="locationRecommendation">Based on Location</label>
  </div>
  <div>
    <input
      type="checkbox"
      id="jobRecommendation"
      name="jobRecommendation"
      checked={recommendations.includes("Job")}
      onChange={() => handleRecommendationChange("Job")}
      className="checkbox checkbox-success mr-2"
    />
    <label htmlFor="jobRecommendation">Based on Job</label>
  </div>
  <div>
    <input
      type="checkbox"
      id="hobbiesRecommendation"
      name="hobbiesRecommendation"
      checked={recommendations.includes("Hobbies")}
      onChange={() => handleRecommendationChange("Hobbies")}
      className="checkbox checkbox-success mr-2"
    />
    <label htmlFor="hobbiesRecommendation">Based on Hobbies</label>
  </div>
</div>


          <div className="modal-action">
          <button type="button" className="btn" onClick={() => document.getElementById('my_modal_2').close()}>Close</button>
            <button
              type="button"
              className="btn"
              onClick={updateSubscription}
            >
              {isLoadingForUpdate? <Loader/> : "Update Subscription"}
              
            </button>
          </div>
        </form>
      </div>
    
    </dialog>


<div className="relative overflow-x-auto ">
      <table className="w-full text-sm text-left text-gray-500 bg-slate-300 ">
        <thead className="text-xs text-gray-900 uppercase bg-slate-300">
          <tr>
            <th scope="col" className="px-6 py-3">
              Product name
            </th>
            <th scope="col" className="px-6 py-3">
              Duration
            </th>
            <th scope="col" className="px-6 py-3">
              Features
            </th>
            <th scope="col" className="px-6 py-3">
              Price
            </th>
            <th scope="col" className="px-6 py-3">
              Action
            </th>
          </tr>
        </thead>
        <tbody>
          {subscripctions?.map((item) => (
            <tr key={item._id} className=" bg-gray-800">
              <th
                scope="row"
                className="px-6 py-4 font-medium  whitespace-nowrap text-white"
              >
                {item.name}
              </th>
              <td className="px-6 py-4 text-white">{item.duration} Months</td>
              <td className="px-6 py-4">
               
                  {item.features.map((feature, index) => (
                    <li className="text-white" key={index}>{feature}</li>
                  ))}
               
              </td>
              <td className="px-6 py-4 text-white">Rs.{item.price}</td>
              <td className="px-6 py-4">
              <div className="space-x-2">

              <button
                    className="btn btn-info"
                    onClick={() => {
                      document.getElementById('my_modal_2').showModal();
                      setEditSubscriptionPlan(item);
                      setPlanName(item.name);
                      setPlanPrice(item.price);
                      setPlanDuration(item.duration);
                      setPlanFeatures(item.features.join('\n'));
                    }}
                    >
                    Edit Plan
                  </button>

                  
                  <button className="btn btn-error" onClick={()=>deleteSubscription(item._id)}>Delete Plan</button>
                    </div>

              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>

    </div>
  );
}

export default AdminSubscriptions;
