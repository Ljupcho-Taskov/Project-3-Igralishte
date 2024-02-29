import Link from "next/link";
import React, { useEffect, useState } from "react";

const Footer: React.FC = () => {
  const [user, setUser] = useState<string | null>(null);

  useEffect(() => {
    const getUserFromLocalStorage = () => {
      return window.localStorage.getItem("registrationData");
    };

    if (typeof window !== "undefined") {
      setUser(getUserFromLocalStorage());
    }
  }, []);
  return (
    <footer>
      <div className="container">
        <div className="row">
          <div className="col-12 py-4">
            <h4 className="mb-3">Следи ги нашите новости!</h4>
            <p className="mb-3">
              Биди дел од нашиот newsletter и дознавај прва за промоции, попусти
              и нови колекции.
            </p>
            <form className="text-left">
              <label className="mb-3" htmlFor="emailAdress">
                E-mail адреса:
              </label>
              <input
                className="w-100 mb-3"
                type="email"
                id="emailAdress"
                name="emailAdress"
              />
              <button className="w-100" type="submit">
                Зачлени се!
              </button>
            </form>
            <hr className="line w-100 text-left my-5" />
            <ul>
              <li className="mb-2">
                <Link href="/about">За нас</Link>
              </li>
              <li className="mb-2">
                <Link href="/contact">Контакт</Link>
              </li>
              <li className="mb-2">
                <Link href="/contact">Локатор на продавницата</Link>
              </li>
              <li className="mb-2">
                <Link href="/FAQ">Често поставувани прашања (FAQ)</Link>
              </li>
              <li className="mb-2">
                {!user ? (
                  <Link href="/register">Регистрирај се </Link>
                ) : (
                  <Link href="/myProfile">Мој Профил </Link>
                )}
                <span className="mx-1">/</span>
                {!user ? (
                  <Link href="/login"> Логирај се</Link>
                ) : (
                  <Link href="/login"> Одјави се</Link>
                )}
              </li>
            </ul>
            <ul>
              <li className="follow-us mb-2">Следи не на:</li>
              <li className="d-flex align-items-center mb-2">
                <span className="svg">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 20 20"
                    fill="none"
                  >
                    <path
                      d="M19.6 5.49097C18.2209 5.49097 16.8982 4.95378 15.923 3.99758C14.9479 3.04138 14.4 1.74449 14.4 0.392212C14.4 0.288191 14.3579 0.188431 14.2828 0.114876C14.2078 0.0413223 14.1061 0 14 0H10C9.89391 0 9.79217 0.0413223 9.71716 0.114876C9.64214 0.188431 9.6 0.288191 9.6 0.392212V12.943C9.5996 13.364 9.48403 13.7772 9.26535 14.1394C9.04667 14.5017 8.73288 14.7998 8.35669 15.0027C7.98051 15.2056 7.55571 15.3058 7.12657 15.293C6.69744 15.2801 6.27968 15.1546 5.91686 14.9295C5.55404 14.7044 5.25943 14.388 5.06376 14.0133C4.86808 13.6386 4.7785 13.2193 4.80436 12.7991C4.83021 12.3789 4.97055 11.9731 5.21075 11.6242C5.45095 11.2753 5.78221 10.9959 6.17 10.8153C6.23772 10.7828 6.29502 10.7327 6.33559 10.6705C6.37617 10.6082 6.39845 10.5361 6.4 10.4623V6.38326C6.40091 6.32543 6.38877 6.26812 6.36444 6.21544C6.34012 6.16275 6.30421 6.11599 6.25929 6.07851C6.21438 6.04103 6.16156 6.01375 6.10463 5.99863C6.04771 5.98351 5.98807 5.98092 5.93 5.99104C4.58189 6.22792 3.33065 6.8369 2.3231 7.74652C1.31555 8.65614 0.593488 9.82867 0.241644 11.1265C-0.110199 12.4244 -0.0772287 13.7937 0.336688 15.0738C0.750604 16.3539 1.52829 17.4917 2.5785 18.3537C3.62871 19.2157 4.90787 19.7661 6.26587 19.9403C7.62388 20.1146 9.00439 19.9054 10.2454 19.3374C11.4865 18.7693 12.5365 17.866 13.2724 16.7334C14.0083 15.6008 14.3995 14.2859 14.4 12.943V8.76595C15.9643 9.70697 17.7648 10.2026 19.6 10.1975C19.7061 10.1975 19.8078 10.1562 19.8828 10.0826C19.9579 10.0091 20 9.90933 20 9.80531V5.88319C20 5.77916 19.9579 5.6794 19.8828 5.60585C19.8078 5.5323 19.7061 5.49097 19.6 5.49097ZM19.2 9.40329C17.4094 9.33709 15.6793 8.75002 14.23 7.71678C14.1708 7.67595 14.1014 7.65165 14.0291 7.64647C13.9569 7.64129 13.8847 7.65543 13.82 7.68736C13.7534 7.72025 13.6976 7.77073 13.6587 7.83311C13.6198 7.89548 13.5995 7.96726 13.6 8.04035V12.943C13.5994 14.1166 13.2632 15.2665 12.6295 16.2621C11.9959 17.2577 11.0902 18.0592 10.0154 18.5754C8.94053 19.0917 7.73958 19.3021 6.54891 19.1827C5.35824 19.0633 4.22557 18.6189 3.27954 17.9C2.33351 17.1811 1.61203 16.2165 1.19703 15.1157C0.782034 14.015 0.690154 12.8221 0.931824 11.6727C1.17349 10.5233 1.73903 9.46341 2.56421 8.61334C3.38938 7.76326 4.44113 7.15711 5.6 6.86372V10.2269C5.11349 10.5024 4.7095 10.8985 4.42864 11.3756C4.14778 11.8526 3.99994 12.3937 4 12.9446C4.00006 13.4954 4.148 14.0365 4.42896 14.5135C4.70992 14.9905 5.11399 15.3866 5.60055 15.6619C6.08712 15.9372 6.63903 16.0821 7.2008 16.082C7.76257 16.0818 8.31441 15.9367 8.80083 15.6611C9.28726 15.3856 9.69113 14.9893 9.97184 14.5122C10.2526 14.035 10.4002 13.4938 10.4 12.943V0.784425H13.61C13.7103 2.20568 14.3315 3.54341 15.3589 4.55079C16.3862 5.55817 17.7505 6.16723 19.2 6.26559V9.40329Z"
                      fill="black"
                    />
                  </svg>
                </span>
                <span className="ml-1">igralishte.sk</span>
              </li>
              <li className="d-flex align-items-center mb-2">
                <span className="svg">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 20 20"
                    fill="none"
                  >
                    <path
                      d="M10 5.41667C9.0935 5.41667 8.20736 5.68547 7.45364 6.1891C6.69991 6.69272 6.11245 7.40854 5.76555 8.24603C5.41865 9.08353 5.32789 10.0051 5.50473 10.8942C5.68158 11.7832 6.1181 12.5999 6.75909 13.2409C7.40008 13.8819 8.21676 14.3184 9.10584 14.4953C9.99492 14.6721 10.9165 14.5813 11.754 14.2344C12.5915 13.8875 13.3073 13.3001 13.8109 12.5464C14.3145 11.7926 14.5833 10.9065 14.5833 10C14.5833 8.78442 14.1004 7.61864 13.2409 6.75909C12.3814 5.89955 11.2156 5.41667 10 5.41667ZM10 13.75C9.25832 13.75 8.5333 13.5301 7.91661 13.118C7.29993 12.706 6.81928 12.1203 6.53545 11.4351C6.25162 10.7498 6.17736 9.99584 6.32205 9.26841C6.46675 8.54098 6.8239 7.8728 7.34835 7.34835C7.8728 6.8239 8.54098 6.46675 9.26841 6.32205C9.99584 6.17736 10.7498 6.25162 11.4351 6.53545C12.1203 6.81928 12.706 7.29993 13.118 7.91661C13.5301 8.5333 13.75 9.25832 13.75 10C13.75 10.9946 13.3549 11.9484 12.6516 12.6516C11.9484 13.3549 10.9946 13.75 10 13.75ZM14.5833 0H5.41667C3.98008 0 2.60233 0.570683 1.5865 1.5865C0.570683 2.60233 0 3.98008 0 5.41667V14.5833C0 15.2947 0.140106 15.999 0.412319 16.6562C0.684532 17.3134 1.08352 17.9105 1.5865 18.4135C2.60233 19.4293 3.98008 20 5.41667 20H14.5833C15.2947 20 15.999 19.8599 16.6562 19.5877C17.3134 19.3155 17.9105 18.9165 18.4135 18.4135C18.9165 17.9105 19.3155 17.3134 19.5877 16.6562C19.8599 15.999 20 15.2947 20 14.5833V5.41667C20 4.70534 19.8599 4.00098 19.5877 3.3438C19.3155 2.68662 18.9165 2.08949 18.4135 1.5865C17.9105 1.08352 17.3134 0.684532 16.6562 0.412319C15.999 0.140106 15.2947 0 14.5833 0ZM19.1667 14.5833C19.1667 15.7989 18.6838 16.9647 17.8242 17.8242C16.9647 18.6838 15.7989 19.1667 14.5833 19.1667H5.41667C4.20109 19.1667 3.0353 18.6838 2.17576 17.8242C1.31622 16.9647 0.833333 15.7989 0.833333 14.5833V5.41667C0.833333 4.20109 1.31622 3.0353 2.17576 2.17576C3.0353 1.31622 4.20109 0.833333 5.41667 0.833333H14.5833C15.7989 0.833333 16.9647 1.31622 17.8242 2.17576C18.6838 3.0353 19.1667 4.20109 19.1667 5.41667V14.5833ZM16.25 4.58333C16.25 4.74815 16.2011 4.90927 16.1096 5.04631C16.018 5.18335 15.8878 5.29016 15.7356 5.35323C15.5833 5.41631 15.4157 5.43281 15.2541 5.40065C15.0924 5.3685 14.944 5.28913 14.8274 5.17259C14.7109 5.05605 14.6315 4.90756 14.5993 4.74591C14.5672 4.58426 14.5837 4.4167 14.6468 4.26443C14.7098 4.11216 14.8166 3.98201 14.9537 3.89044C15.0907 3.79887 15.2518 3.75 15.4167 3.75C15.6377 3.75 15.8496 3.8378 16.0059 3.99408C16.1622 4.15036 16.25 4.36232 16.25 4.58333Z"
                      fill="black"
                    />
                  </svg>
                </span>
                <span className="ml-1">igralishte.sk</span>
              </li>
            </ul>
            <p className="rights mt-5">
              Сите права задржани © 2023 igralishtesk.mk
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;