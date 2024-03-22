import React, { useEffect, useMemo, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Cart as CartInterface,
  setIsOpen,
  setProductToCart,
} from "../../state/features/cartSlice";
import { RootState } from "../../state/store";
import { useNavigate, useParams } from "react-router-dom";
import { useTheme } from "@mui/material";
import TabImageList from "../../components/common/TabImageList/TabImageList";
import { Product, setPreferredCoin } from "../../state/features/storeSlice";
import DangerousIcon from "@mui/icons-material/Dangerous";
import { CartIcon } from "../../components/layout/Navbar/Navbar-styles";
import {
  CartIconContainer,
  NotificationBadge,
} from "../Store/Store/Store-styles";
import { useFetchOrders } from "../../hooks/useFetchOrders";
import {
  AddToCartButton,
  ArrrSwitch,
  BackToStoreButton,
  CartBox,
  ProductDescription,
  ProductDetailsContainer,
  ProductLayout,
  ProductNotFound,
  ProductPrice,
  ProductPriceRow,
  ProductTitle,
  UnavailableButton,
} from "./ProductPage-styles";
import { QortalSVG } from "../../assets/svgs/QortalSVG";
import { setNotification } from "../../state/features/notificationsSlice";
import { BackArrowSVG } from "../../assets/svgs/BackArrowSVG";
import {
  NumericTextFieldQshop,
  NumericTextFieldRef,
  Variant,
} from "../../components/common/NumericTextFieldQshop";
import { ARRRSVG } from "../../assets/svgs/ARRRSVG";
import { BTCSVG } from "../../assets/svgs/BTCSVG";
import { LTCSVG } from "../../assets/svgs/LTCSVG";
import { DOGESVG } from "../../assets/svgs/DOGESVG";
import { DGBSVG } from "../../assets/svgs/DGBSVG";
import { RVNSVG } from "../../assets/svgs/RVNSVG";
import { CoinFilter } from "../Store/Store/Store";
import { setIsLoadingGlobal } from "../../state/features/globalSlice";

export const ProductPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const params = useParams();
  const theme = useTheme();
  const ref = useRef<NumericTextFieldRef>(null);

  // Get params for when user refreshes page or receives url link
  const storeOwner: string = params.user || "";
  const productID: string = params.product || "";
  const catalogueID: string = params.catalogue || "";
  const storeId: string = params.store || "";

  const currentViewedStore = useSelector(
    (state: RootState) => state.store.currentViewedStore
  );
  const [product, setProduct] = useState<Product | null>(null);
  const [cartAddAmount, setCartAddAmount] = useState<number>(0);
  const preferredCoin = useSelector(
    (state: RootState) => state.store.preferredCoin
  );
  const [exchangeRate, setExchangeRate] = useState<number | null>(null);
  const catalogueHashMap = useSelector(
    (state: RootState) => state.global.catalogueHashMap
  );
  const carts = useSelector((state: RootState) => state.cart.carts);
  const user = useSelector((state: RootState) => state.auth.user);

  const calculateARRRExchangeRate = async () => {
    try {
      const url = "/crosschain/price/PIRATECHAIN?maxtrades=10&inverse=true";
      const info = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const responseDataStore = await info.text();

      const ratio = +responseDataStore / 100000000;
      if (isNaN(ratio)) throw new Error("Cannot get exchange rate");
      setExchangeRate(ratio);
    } catch (error) {
      dispatch(setPreferredCoin(CoinFilter.qort));
      dispatch(
        setNotification({
          alertType: "error",
          msg: "Cannot get exchange rate- reverted to QORT",
        })
      );
    }
  };
  const calculateBTCExchangeRate = async () => {
    try {
      const url = "/crosschain/price/BITCOIN?maxtrades=10&inverse=true";
      const info = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const responseDataStore = await info.text();

      const ratio = +responseDataStore / 100000000;
      if (isNaN(ratio)) throw new Error("Cannot get exchange rate");
      setExchangeRate(ratio);
    } catch (error) {
      dispatch(setPreferredCoin(CoinFilter.qort));
      dispatch(
        setNotification({
          alertType: "error",
          msg: "Cannot get exchange rate- reverted to QORT",
        })
      );
    }
  };
  const calculateLTCExchangeRate = async () => {
    try {
      const url = "/crosschain/price/LITECOIN?maxtrades=10&inverse=true";
      const info = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const responseDataStore = await info.text();

      const ratio = +responseDataStore / 100000000;
      if (isNaN(ratio)) throw new Error("Cannot get exchange rate");
      setExchangeRate(ratio);
    } catch (error) {
      dispatch(setPreferredCoin(CoinFilter.qort));
      dispatch(
        setNotification({
          alertType: "error",
          msg: "Cannot get exchange rate- reverted to QORT",
        })
      );
    }
  };
  const calculateDOGEExchangeRate = async () => {
    try {
      const url = "/crosschain/price/DOGECOIN?maxtrades=10&inverse=true";
      const info = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const responseDataStore = await info.text();

      const ratio = +responseDataStore / 100000000;
      if (isNaN(ratio)) throw new Error("Cannot get exchange rate");
      setExchangeRate(ratio);
    } catch (error) {
      dispatch(setPreferredCoin(CoinFilter.qort));
      dispatch(
        setNotification({
          alertType: "error",
          msg: "Cannot get exchange rate- reverted to QORT",
        })
      );
    }
  };
  const calculateDGBExchangeRate = async () => {
    try {
      const url = "/crosschain/price/DIGIBYTE?maxtrades=10&inverse=true";
      const info = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const responseDataStore = await info.text();

      const ratio = +responseDataStore / 100000000;
      if (isNaN(ratio)) throw new Error("Cannot get exchange rate");
      setExchangeRate(ratio);
    } catch (error) {
      dispatch(setPreferredCoin(CoinFilter.qort));
      dispatch(
        setNotification({
          alertType: "error",
          msg: "Cannot get exchange rate- reverted to QORT",
        })
      );
    }
  };
  const calculateRVNExchangeRate = async () => {
    try {
      const url = "/crosschain/price/RAVENCOIN?maxtrades=10&inverse=true";
      const info = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const responseDataStore = await info.text();

      const ratio = +responseDataStore / 100000000;
      if (isNaN(ratio)) throw new Error("Cannot get exchange rate");
      setExchangeRate(ratio);
    } catch (error) {
      dispatch(setPreferredCoin(CoinFilter.qort));
      dispatch(
        setNotification({
          alertType: "error",
          msg: "Cannot get exchange rate- reverted to QORT",
        })
      );
    }
  };

  const storeToUse = useMemo(() => {
    return currentViewedStore;
  }, [storeOwner, user?.name, currentViewedStore]);

  const switchCoin = async () => {
    dispatch(setIsLoadingGlobal(true));

    await calculateARRRExchangeRate();
    await calculateBTCExchangeRate();
    await calculateLTCExchangeRate();
    await calculateDOGEExchangeRate();
    await calculateDGBExchangeRate();
    await calculateRVNExchangeRate();
    dispatch(setIsLoadingGlobal(false));
  };

  useEffect(() => {
    if (
      preferredCoin === CoinFilter.arrr &&
      storeToUse?.supportedCoins?.includes(CoinFilter.arrr)
    ) {
      switchCoin();
    } else if (
      preferredCoin === CoinFilter.btc &&
      storeToUse?.supportedCoins?.includes(CoinFilter.btc)
    ) {
      switchCoin();
    } else if (
      preferredCoin === CoinFilter.ltc &&
      storeToUse?.supportedCoins?.includes(CoinFilter.ltc)
    ) {
      switchCoin();
    } else if (
      preferredCoin === CoinFilter.doge &&
      storeToUse?.supportedCoins?.includes(CoinFilter.doge)
    ) {
      switchCoin();
    } else if (
      preferredCoin === CoinFilter.dgb &&
      storeToUse?.supportedCoins?.includes(CoinFilter.dgb)
    ) {
      switchCoin();
    } else if (
      preferredCoin === CoinFilter.rvn &&
      storeToUse?.supportedCoins?.includes(CoinFilter.rvn)
    ) {
      switchCoin();
    }
  }, [preferredCoin, storeToUse]);

  useEffect(() => {
    if (!storeToUse && storeOwner !== user?.name) {
      navigate(`/${storeOwner}/${storeId}`);
    }
  }, [storeToUse, storeOwner, user?.name]);

  const coinToUse = useMemo(() => {
    if (
      preferredCoin === CoinFilter.arrr &&
      storeToUse?.supportedCoins?.includes(CoinFilter.arrr)
    ) {
      return CoinFilter.arrr;
    } else if (
      preferredCoin === CoinFilter.btc &&
      storeToUse?.supportedCoins?.includes(CoinFilter.btc)
    ) {
      return CoinFilter.btc;
    } else if (
      preferredCoin === CoinFilter.ltc &&
      storeToUse?.supportedCoins?.includes(CoinFilter.ltc)
    ) {
      return CoinFilter.ltc;
    } else if (
      preferredCoin === CoinFilter.doge &&
      storeToUse?.supportedCoins?.includes(CoinFilter.doge)
    ) {
      return CoinFilter.doge;
    } else if (
      preferredCoin === CoinFilter.dgb &&
      storeToUse?.supportedCoins?.includes(CoinFilter.dgb)
    ) {
      return CoinFilter.dgb;
    } else if (
      preferredCoin === CoinFilter.rvn &&
      storeToUse?.supportedCoins?.includes(CoinFilter.rvn)
    ) {
      return CoinFilter.rvn;
    } else {
      return CoinFilter.qort;
    }
  }, [preferredCoin, storeToUse]);

  const { checkAndUpdateResourceCatalogue, getCatalogue } = useFetchOrders();

  const minCart = 1;
  const maxCart = 99;

  // Set cart notifications when cart changes
  useEffect(() => {
    if (user?.name && storeId) {
      const shopCart: CartInterface = carts[storeId];
      // Get the orders of this cart
      const orders = shopCart?.orders || {};
      let totalQuantity = 0;
      Object.keys(orders).forEach(key => {
        const order = orders[key];
        const { quantity } = order;
        totalQuantity += quantity;
      });
      setCartAddAmount(totalQuantity);
    }
  }, [carts, user, storeId]);

  const getProductData = async () => {
    const productInRedux = catalogueHashMap[catalogueID]?.products[productID];
    const paramsLoaded = productID && catalogueID && storeOwner && storeId;
    if (productInRedux) {
      setProduct(productInRedux);
      return;
    } else if (!productInRedux && paramsLoaded) {
      checkAndUpdateResourceCatalogue({ id: catalogueID });
      await getCatalogue(storeOwner, catalogueID);
    } else {
      return null;
    }
  };

  useEffect(() => {
    const awaitProductData = async () => {
      await getProductData();
    };
    awaitProductData();
  }, [catalogueHashMap]);

  let price = product?.price?.find(item => item?.currency === "qort")?.value;
  const priceArrr = product?.price?.find(
    item => item?.currency === CoinFilter.arrr
  )?.value;
  const priceBtc = product?.price?.find(
    item => item?.currency === CoinFilter.btc
  )?.value;
  const priceLtc = product?.price?.find(
    item => item?.currency === CoinFilter.ltc
  )?.value;
  const priceDoge = product?.price?.find(
    item => item?.currency === CoinFilter.doge
  )?.value;
  const priceDgb = product?.price?.find(
    item => item?.currency === CoinFilter.dgb
  )?.value;
  const priceRvn = product?.price?.find(
    item => item?.currency === CoinFilter.rvn
  )?.value;

  if (coinToUse === CoinFilter.arrr && priceArrr) {
    price = +priceArrr;
  } else if (coinToUse === CoinFilter.btc && priceBtc) {
    price = +priceBtc;
  } else if (coinToUse === CoinFilter.ltc && priceLtc) {
    price = +priceLtc;
  } else if (coinToUse === CoinFilter.doge && priceDoge) {
    price = +priceDoge;
  } else if (coinToUse === CoinFilter.dgb && priceDgb) {
    price = +priceDgb;
  } else if (coinToUse === CoinFilter.rvn && priceRvn) {
    price = +priceRvn;
  } else if (price && exchangeRate && coinToUse !== CoinFilter.qort) {
    price = +price * exchangeRate;
  }

  const addToCart = () => {
    if (user?.name === storeOwner) {
      dispatch(
        setNotification({
          alertType: "error",
          msg: "You own this store! You cannot add your own products to your cart!",
        })
      );
      return;
    }
    if (product && ref?.current?.getTextFieldValue() !== "") {
      for (let i = 0; i < Number(ref?.current?.getTextFieldValue() || 0); i++) {
        dispatch(
          setProductToCart({
            productId: product.id,
            catalogueId: product.catalogueId,
            storeId,
            storeOwner,
          })
        );
      }
    }
  };
  const status = product?.status;
  const available = status === "AVAILABLE";
  const availableJSX = (
    <>
      <NumericTextFieldQshop
        name="Quantity"
        label="Quantity"
        variant={Variant.filled}
        required={true}
        style={{ width: "300px" }}
        initialValue={"1"}
        addIconButtons
        allowDecimals={false}
        minValue={minCart}
        maxValue={maxCart}
        ref={ref}
      />
      <AddToCartButton variant={"contained"} onClick={addToCart}>
        <CartIcon color={"#ffffff"} height={"25"} width={"25"} />
        <span style={{ marginLeft: "5px" }}>Add to Cart</span>
      </AddToCartButton>
    </>
  );

  const unavailableJSX = (
    <UnavailableButton
      variant={"contained"}
      onClick={() => {
        if (user?.name === storeOwner) {
          dispatch(
            setNotification({
              alertType: "error",
              msg: "You own this store! You cannot add your own products to your cart!",
            })
          );
          return;
        }
        dispatch(
          setNotification({
            alertType: "error",
            msg: "This product is out of stock!",
          })
        );
      }}
    >
      <DangerousIcon height={"25"} width={"25"} />
      Out of Stock
    </UnavailableButton>
  );

  return product ? (
    <ProductLayout>
      <BackToStoreButton
        onClick={() => {
          navigate(`/${storeOwner}/${storeId}`);
        }}
      >
        <BackArrowSVG height={"20"} width={"20"} color={"#ffffff"} />
        Store
      </BackToStoreButton>
      <TabImageList imgStyle={{ objectFit: "cover" }} images={product.images} />
      <ProductDetailsContainer>
        <ProductTitle variant="h2">{product.title}</ProductTitle>
        <ProductDescription variant="h3">
          {product.description}
        </ProductDescription>
        <ProductPriceRow>
          {coinToUse === CoinFilter.qort && (
            <ProductPrice>
              <QortalSVG
                height={"26"}
                width={"26"}
                color={theme.palette.text.primary}
              />{" "}
              {price}
            </ProductPrice>
          )}
          {coinToUse === CoinFilter.arrr && (
            <ProductPrice>
              <ARRRSVG
                height={"26"}
                width={"26"}
                color={theme.palette.text.primary}
              />{" "}
              {price}
            </ProductPrice>
          )}
          {coinToUse === CoinFilter.btc && (
            <ProductPrice>
              <BTCSVG
                height={"26"}
                width={"26"}
                color={theme.palette.text.primary}
              />{" "}
              {price}
            </ProductPrice>
          )}
          {coinToUse === CoinFilter.ltc && (
            <ProductPrice>
              <LTCSVG
                height={"26"}
                width={"26"}
                color={theme.palette.text.primary}
              />{" "}
              {price}
            </ProductPrice>
          )}
          {coinToUse === CoinFilter.doge && (
            <ProductPrice>
              <DOGESVG
                height={"26"}
                width={"26"}
                color={theme.palette.text.primary}
              />{" "}
              {price}
            </ProductPrice>
          )}
          {coinToUse === CoinFilter.dgb && (
            <ProductPrice>
              <DGBSVG
                height={"26"}
                width={"26"}
                color={theme.palette.text.primary}
              />{" "}
              {price}
            </ProductPrice>
          )}
          {coinToUse === CoinFilter.rvn && (
            <ProductPrice>
              <RVNSVG
                height={"26"}
                width={"26"}
                color={theme.palette.text.primary}
              />{" "}
              {price}
            </ProductPrice>
          )}
        </ProductPriceRow>
        {available ? availableJSX : unavailableJSX}
      </ProductDetailsContainer>
      {/* Toggle to show price of ARRR or not */}
      <ArrrSwitch
        checked={coinToUse === CoinFilter.arrr}
        onChange={() => {
          if (coinToUse !== CoinFilter.arrr) {
            dispatch(setPreferredCoin(CoinFilter.arrr));
          } else {
            dispatch(setPreferredCoin(CoinFilter.qort));
          }
        }}
      />
      {user?.name && user?.name !== storeOwner ? (
        <CartBox>
          <CartIconContainer fixedCartPosition={false}>
            <CartIcon
              color={theme.palette.text.primary}
              height={"32"}
              width={"32"}
              onClickFunc={() => {
                dispatch(setIsOpen(true));
              }}
            />
            {cartAddAmount > 0 && (
              <NotificationBadge fixedCartPosition={false}>
                {cartAddAmount}
              </NotificationBadge>
            )}
          </CartIconContainer>
        </CartBox>
      ) : null}
    </ProductLayout>
  ) : (
    <ProductNotFound>Product ID ${productID} Not Found</ProductNotFound>
  );
};
