
export default function TabDescription({ activeTab }) {


    return (
       <div>
             {/* Conditional Rendering Based on activeTab */}
      {activeTab === 'Travel' ? (
        <div>
        <h2 className="font-semibold text-xl ml-4 mb-4 text-black ">Nomadic Trails</h2>
        <p className=" text-xs  mb-6 ml-4 text-teal-600">Create your own travel itinerary through Sri Lanka’s ancient landmarks, and natural landscapes, designed to enrich your journey and inspire new adventures.</p>
        </div>
      ) : activeTab === 'Experience' ? (
       <div> 
        <h2 className="font-semibold text-xl ml-4 mb-4 text-black ">Immersive Adventures</h2>
        <p className=" text-xs  mb-6 ml-4 text-teal-600">Push your boundaries with thrilling activities like surfing, hiking, and wildlife encounters, all while soaking in Sri Lanka’s natural beauty.</p>
        </div>
      ) : activeTab === 'Stay' ? (
        <div>
        <h2 className="font-semibold text-xl ml-4 mb-4 text-black ">Work from Paradise</h2>
        <p className=" text-xs  mb-6 ml-4 text-teal-600">Browse through our carefully curated list of resorts and lodgings with serene workspaces, reliable Wi-Fi, and breathtaking views that inspire productivity.</p>
        </div>
      ) : null}

       </div> )
     
}