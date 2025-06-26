
import Nav from "@/components/ui/nav"
import Footer from "@/components/ui/footer"
import Pichart from "@/components/ui/pichart"








export default function aboutUs() {
 
 



 
return (
    <div>
         
            <div className="flex flex-col justify-between gap-5">
                <Nav />
                <div 
                    style={{
                        background: 'url(/starstwo.png) no-repeat center center',
                        backgroundSize: 'cover',
                    }}
                    className="flex lg:h-screen w-full aspect-square flex-col items-center justify-center   mt-20"
                >
                    <h1
                       className="text-white font-bold lg:text-6xl sm:text-3xl text-xl text-center"
                    >
                        A Galaxy cannot be made without a star.
                    </h1>
                    <br />
                    <p className="sm:text-xml text-center" style={{ color: 'white' }}>
                        It was just a dream until we did not merge, creating a universe of endless possibilities.
                    </p>
                </div>
               
                    <Pichart />
               
                <Footer />
            </div>
       
    </div>
)
}