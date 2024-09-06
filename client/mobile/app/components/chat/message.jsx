'use client'
// import { useSession } from 'next-auth/react'

export default function Message(props) {
  const { content, isbot } = props.message;



//   const { data: session } = useSession();
//   const currentUser = session?.user;
//   const username = currentUser?.username;

  const botAvatar= ""
  const  userAvatar= ``

  return (
    
    <div className={`flex items-end ${!isbot ? 'justify-end' : ''}`}>
      <div className={`flex flex-col space-y-2 text-xs max-w-xs mx-2 ${isbot ? 'order-2 items-start' : 'order-1 items-end'}`}>
        <div>
          <span className={`px-4 py-2 rounded-lg inline-block ${isbot ? 'rounded-bl-none bg-gray-200 text-black  mt-6' : 'rounded-br-none bg-sapphire text-white  mt-6'}`}>
            {content}
          </span>
        </div>
      </div>
      <img
        src={isbot ? botAvatar : userAvatar}
        alt="My profile"
        className={`w-6 h-6 rounded-full ${isbot ? 'order-1' : 'order-2'}`}
      />  
    </div>


 )
};

