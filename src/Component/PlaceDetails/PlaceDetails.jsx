import React from "react";
import "./placedetails.css";
import PhoneIcon from "@mui/icons-material/Phone";
import PlaceIcon from "@mui/icons-material/Place";
import StarIcon from "@mui/icons-material/Star";

const PlaceDetails = ({ place }) => {
  return (
    <div className="Card">
      <div className="imageSec">
        <img
          src={
            place.photo
              ? place.photo.images.large.url
              : "https://theplanetd.com/images/popular-indian-dishes-cuisine.jpg"
          }
          alt=""
        />
      </div>

      <div className="detailsSec">
        <h3 className="placeName">{place.name}</h3>

        {place.rating && 
          <div className="common">
            <div className="iconDiv">
              <StarIcon
                style={{ width: "17px", height: "17px", color: "#FFBF00" }}
              />
              <p>{place.rating}</p>
            </div>

          <p>out of {place.num_reviews} reviews</p>
        </div>
        }

        {place.price &&
          <div className="common">
            <p>Price</p>
            <p>{place.price_level}</p>
          </div>
        }

        {place.ranking && <div className="common">
          <p>Ranking</p>
          <p>{place.ranking}</p>
        </div>
        }
        {/* if awards are present */}
        {place?.awards?.map((award, index) => (
          <div key={index} className="common">
            <img src={award.images.small} alt={award.display_name} />
            <p>{award.display_name}</p>
          </div>
        ))}

        {/* if cuisine are present */}
        {place.cuisine && (
          <div className="cuisineBox">
            {place.cuisine.map(({ name }) => (
              <p key={name}>{name}</p>
            ))}
          </div>
        )}

        {/* if address is present */}
        {place?.address && (
          // we can have location icon here
          <div className="common2">
            <PlaceIcon style={{ width: "15px", height: "15px" }} />
            <p className="address">{place.address}</p>
          </div>
        )}

        {/* if phoneno is present   */}
        {place?.phone && (
          <div className="common2">
            <PhoneIcon style={{ width: "15px", height: "15px" }} />
            <p>{place.phone}</p>
          </div>
        )}

        <div className="placeWebsite">
          {place?.web_url && (
            <button onClick={() => window.open(place.web_url, "_blank")}>
              Travelia
            </button>
          )}
          {place?.website && (
            <button onClick={() => window.open(place.website, "_blank")}>
              Website
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default PlaceDetails;