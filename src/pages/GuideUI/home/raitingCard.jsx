import {
    Card,
    CardBody,
    CardFooter,
    Typography,
    Avatar,
    Rating,
  } from "@material-tailwind/react";
import image from '../../../assets/image/user.png'
  const ratingData = [
    {
      comment:
        "So much easier to visualize and plan a road trip to my favorite rock climbing .",
      avatarSrc:
        "https://images.unsplash.com/flagged/photo-1570612861542-284f4c12e75f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2940&q=80",
      authorName: "Tania Andrew",
      jobTitle: "Travel Blogger",

       ratingValue: 5,
    },
    {
      comment:
        "I love using this app to discover new hiking trails. It's been a game-changer for me!",
      avatarSrc:
        image, 
      authorName: "John Doe",
      jobTitle: "Outdoor Enthusiast",
      ratingValue: 4,
    },
    {
      comment: "Great app for planning weekend getaways. Highly recommended and user-friendly!",
      avatarSrc:
        image,
      authorName: "Jane Smith",
      jobTitle: "Travel Blogger",
      ratingValue: 5,
    },
    {
      comment:
        "I've used this app for my last three road trips, and it's been incredibly helpful. Five stars!",
      avatarSrc:
        image,
      authorName: "Michael Johnson",
      jobTitle: "Road Trip Enthusiast",
      ratingValue: 5,
    },
    
  
  ];
  
  export function SimpleCard() {
    // Define the fixed width and height for each card
    const cardWidth = "250px"; // Adjust as needed
    const cardHeight = "350px"; // Adjust as needed
  
    return (
      <div className="overflow-hidden max-h-550 lg:ml-24">
        <div className="flex flex-wrap -mx-4">
          {ratingData.map((data, index) => (
            <div
              key={index}
              className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5 px-4 mb-4 mx-auto block "
              style={{ width: cardWidth, height: cardHeight }} // Apply fixed size here
            >
              <Card className="w-full h-full">
                <CardBody>
                  <Typography color="blue-gray" className="mb-2">
                    {data.comment}
                  </Typography>
                  <Avatar
                    src={data.avatarSrc}
                    alt="Avatar"
                    size="sm"
                    className="mt-2"
                  />
                  <Typography variant="h6" className="mt-2">
                    {data.authorName}
                  </Typography>
                  <Typography color="gray" className="mb-2">
                    {data.jobTitle}
                  </Typography>
                  <Rating value={data.ratingValue} readonly />
                </CardBody>
                <CardFooter className="pt-0">
                  {/* Footer content */}
                </CardFooter>
              </Card>
            </div>
          ))}
        </div>
      </div>
    );
  }
  