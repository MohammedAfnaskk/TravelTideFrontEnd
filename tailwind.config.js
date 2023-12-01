
import withMT from "@material-tailwind/react/utils/withMT";

export default withMT({
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    customColor: {
      main: "#f75940", // Your custom color code
    },



    extend: {
      height: {
        '550': '550px',
<<<<<<< HEAD
        '450': '450px',
=======
>>>>>>> origin/main
      },
      width:{
        '700': '700px',
       },
      marginleft:{
        '120':'450rem'
      },
      
    },
  },
  plugins: [],
});