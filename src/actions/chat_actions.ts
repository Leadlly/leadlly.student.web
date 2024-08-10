export const getChat = async (data: {mentorId: string, studentId: string}) => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_CHAT_API_BASE_URL}/api/chat/get`,
      {
        method: "POST", 
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data), 
        credentials: "include",
        cache: "no-store",
      }
    );

    const responseData = await response.json();
    console.log('Chat data fetched:', responseData); 

    return responseData;
  } catch (error) {
    if (error instanceof Error) {
      console.error(`Error fetching chat data: ${error.message}`);
      throw error;
    } else {
      console.error("An unknown error occurred while fetching chat data!");
      throw new Error("An unknown error occurred while fetching chat data!");
    }
  }
};
