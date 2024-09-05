import express from "express";


const router = express.Router();

router.post("/signup", adminSignup);
router.post("/login", adminLogin);
router.post("/logout", adminLogout);


router.put("/update");
router.delete("/delete");

router.get("/userList");

