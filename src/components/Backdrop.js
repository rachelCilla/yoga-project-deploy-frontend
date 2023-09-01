import { motion } from "framer-motion";

import React from "react";

export default function Backdrop({ children, onClick }) {
	return (
		<motion.div
			className="fixed top-0 left-0 w-full h-100 bg-grayBlueDarker  flex justify-center items-center  "
			onClick={onClick}
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			exit={{ opacity: 0 }}
		>
			{children}
		</motion.div>
	);
}
