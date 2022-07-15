import "./App.css";
import { motion } from "framer-motion";

function App() {
  return (
    <div>
      <div className="container">
        <div className="item-holder">
          <motion.div
            transition={{ delay: 0.5, type: "tween", duration: 1 }}
            initial={{ x: "-200%", y: "400vh" }}
            animate={{ y: 0, x: 0 }}
          >
            <div className="item-1"></div>
          </motion.div>
        </div>

        {/* <div className="item-1"></div> */}
      </div>
    </div>
  );
}

export default App;
