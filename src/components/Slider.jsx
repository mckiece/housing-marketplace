import { collection, getDocs, limit, orderBy, query } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Scrollbar, A11y } from "swiper";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import { db } from "../firebase.config";
import Spinner from "./Spinner";

function Slider() {
	const [loading, setLoading] = useState(true);
	const [listings, setListings] = useState(null);

	const navigate = useNavigate();

	useEffect(() => {
		const fetchListing = async () => {
			const listingsRef = collection(db, "listings");
			const q = query(
				listingsRef,
				orderBy("timestamp", "desc"),
				limit(5)
			);
			const querySnap = await getDocs(q);

			let listings = [];

			querySnap.forEach((doc) => {
				return listings.push({
					id: doc.id,
					data: doc.data(),
				});
			});
			console.log(listings);
			setListings(listings);
			setLoading(false);
		};

		fetchListing();
	}, []);

	if (loading) {
		return <Spinner />;
	}

	return (
		listings && (
			<>
				<p className="exploreHeading">Recommended</p>
				<Swiper
					modules={[Navigation, Pagination, Scrollbar, A11y]}
					slidesPerView={1}
					pagination={{ clickable: true }}
				>
					{listings.map(({ data, id }) => (
						<SwiperSlide
							key={id}
							onClick={() =>
								navigate(`/category/${data.type}/${id}`)
							}
						>
							<div
								style={{
									background: `url(${data.imageUrls[0]}) center no-repeat`,
									backgroundSize: "cover",
								}}
								className="swiperSlideDiv"
							>
								<p className="swiperSlideText">{data.name}</p>
								<p className="swiperSlidePrice">
									${data.discountedPrice ?? data.regularPrice}
									{data.type === "rent" && " / month"}
								</p>
							</div>
						</SwiperSlide>
					))}
				</Swiper>
			</>
		)
	);
}

export default Slider;