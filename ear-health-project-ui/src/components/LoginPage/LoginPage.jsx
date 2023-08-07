import React from "react";
import "./LoginPage.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import ApiClient from "../../services/apiClient.JS";

const LoginPage = ({
  userUpdater,
  loginHandler,
  setProfileImageKey,
  fetchNavNotifs,
}) => {
  // establish states that track form changes
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");

  //navigation for redirecting once registration
  let navigate = useNavigate();

  //state that hold the error taht happen when logging in

  const handleLogin = async (e) => {
    e.preventDefault();

    const loginInfo = JSON.stringify({
      email,
      password,
    });

    const { data, error } = await ApiClient.loginUser(loginInfo);

    if (error) {
      setLoginError(error);
    }

    if (data?.user) {
      userUpdater(data.user);
      setProfileImageKey(data.user.image);
      ApiClient.setToken(data.token);
      loginHandler();
      const notificationData = await ApiClient.getUserNotifications(
        data.user.userId
      );
      fetchNavNotifs(notificationData.data.notifications);
      navigate("/");
    }
  };

  return (
    <div>
      <div className="split-screen">
        <div className="left">
          <section className="copy">
            <h1>Explore your options here at Earie</h1>
            <p>Licensed professionals are here for all you hearing needs</p>
          </section>
        </div>
        <div className="right">
          <form onSubmit={handleLogin}>
            <section className="copy">
              <h2>Sign In</h2>
              <img
                src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAMgAAADICAYAAACtWK6eAAAAAXNSR0IArs4c6QAAIABJREFUeF7tnQmczeX+x39n9hmGGTsthBvpKgqhklKy1BWlosVWbteepZSuSImKFG038U/pimgTKTJuRSolNCWSLKkQWcbs5/96P+d8Tk+nmTmH2c6M+b14zcw5v+15nu/n+e7fr8vtdrucsqOgZyBs69atEb///nvM1q1bq/z66689du3a1XPPnj31fvvtt8gDBw649u/f7xw+fNhJTU11srKyzP/s7GzzHmFhYU54eLj5Hx8f75QrV85JSEjISkxM/Lly5cofV6tW7eXatWuvq169+oGqVatmtG3blgvdBT2Isvs5jqsMICdMBmwscVu3bk3YsWNHrW+//bbR119/fdGWLVvq79y5s+pPP/1U89ChQ/ExMTHh6enpLhE/T4Pw+dvtdjvR0dHmd/0XQAAJ/9PT081PDkBkHe6IiIiszMzMjPLlyx+tWbPmT7Vr195Zv379HWeddVZSw4YNN9SvX39P3bp1D5eB54TXuAwgxzF1ET///HPC5s2b63/11Ve3rF69uvM333xT7YcffohMT08PS0tL83HiiIgIJzIy0gABAgcIHC6Xy0fsAEIEz/c6R+/DufznHvqd7zhP4BLAuE9GRoaPA3FeZGSkOyoqKrN+/fqAZtmFF174VtOmTTedeuqpe+vXr59RBprgVr6Mg+Q9TzEffPBBpc2bN5//0UcfdVi3bl3HnTt3Vjl27Fis2+1mWzegYIcHFPZOLyL2BwZEDUELEAJATq+hc/WdxC4AI7HMvj/fc/DszMxMG3QgNDs2NjatVq1aW5s2bfpm69atPzv77LPXt2/f/jfHcY6VASZnQigDyF/nJWbFihWnvfPOO50//vjjGzZu3Ng0LS0tyhaRAIOIEWLVIa4AYYtbsLPbnEDfidhTUlJ83EX3sjlKXFycIXb+SzzjJ3/zPDiVAKfnAFR+F7exuZUNtsjIyKw6depsuuyyyxZcc801y5o1a7YlMTGxTCSzaKIMIJ7JCF+xYsWZy5cv77lkyZJrN27cWM/tdkdKD5CIIw4hAuYnALDFIntH9z/f5hz+opQNNIlSuYleAFQA4Kf0l5zOj4qK8r1fTsCxuFRWo0aNdnTs2HHtFVdc8UKLFi0+KwPLya2ku5KTk6vNnTt3yLp16/750UcfVTx69KiRUWJiYv6kP9gKtD/DEYjEEfje1gkEEl1ng07n5iXlwSH8lXgBSFwNkHAewNE9ZRUTkHICD+cmJiYaTnPs2DEnLS3NXB8VFeW++OKL919wwQVPduvWbUFsbOy2Ro0a/bET5PXCpey7k46D7Nq1K2bDhg0NXnzxxQFLliy55ciRIzGsqZRqfrfFKX9Zn/Mgcokt0gdsJTsnxVqilTiFCJh76VpbmRcn0k9xMf9zdb2/viJxC1FMZmN7bBIBxQX5OzY21oAM0zPGBe+8pHbo0OHt3r17P9O2bdt1lSpVOnIy6SsnDUB27NiRsGDBgktfeumlQRs3bmydnZ0dbVuVctv4BAZ7t85JHPIXs6SkAygRZm67uIjfXwfhfOk6NgB1Hj8R8cSVxFnsd7EBIjDZIpk/h/OfB+kxjuOkN2zY8PNevXq92LNnz+Wnn376TlShUsYw/jKc0g4Q165du2o+//zzN8+cOfO2n376qU54eHgEiq+Ild0yrwMCzYmwbQD4E5xtbUIJFwHbOomuYcf2N/H6E7iALGDYSjdj0b1sZyPvoOfZxgPuzecSyQKNHz8N/7nm4MGDiI/uatWq7e/du/ebPXr0mNWkSZMvHcfJexJLMIpKLUDwYD///PN9X3vttTt37NhRJTMzM6xChQouCPK337BsOkacyI04taa2c06EahM8srtEGHuHtq1OeXEI6Q02CG2/B6KOfb2/TuHvfZfSLoMASrotlvnrU+JQudGwxs998OjDsY4cOcLcuePj44/ceuutr/fp02faueeeuxH1qwRjIcdXL3UAOXz4cOXJkyffOmPGjLtTUlKqZGRkhEEEKN4QrRRR/iaMQ2DJbWFtc6k/mAAE99EObesVMgXzTHtnt59ji0rBWrGkk8jvIh1Ifg/pHuIgANj/M+krvJf/c/3nQaDgPuI+FStWNDrK0aNHnfLly/Px7/369Zt61113za5Vq9ae0gSU0gSQ8k899VTncePGPbBv37460dHRkYBBXm2IgUWFoBFLWFy+D7SDQvzcQwRpK9IQF7sp95Dp1fZy8z2Eq90XwkpISHD4CeHxOVYkf0ejHH38BMDs2rzvoUOHnN9//93852/GIxFQxCsuJt8Jije/2+ZoGwSBxs+8MV+IWYxVOo84E3PI9ykpKdmVKlX6fvTo0RP/9a9/vVO+fPn9pUGZLw0AiVy0aFHLhx566LEvvviiSXh4eCQEiGzNIrKg+u+v6EI84ii5cRABRPFTsu7ofIAhUEBEVapUcerWreuceeaZTq1atZwmTZqYXbZy5crmu0qVKhlw2Ap5bru4LF9S8gEFgNm3b59DsCN/f/XVV86ePXuc7777zvn+++/Nd4xJ4qBELYDDfMhaJ+tcIB0ELgsgNXcyWnB/gMHfAJDfOS8zMzOzcePGH40ZM+bhyy67bHXVqlWPlmSxq0QDZN26dTXGjx//zIoVKzqlpKREQvAQAIqxdAD+1u4JYULQfM9ngXZPFhai9491gtDgBBB+06ZNnTp16hggNG7c2Kldu7bhEIFEF4Cmd7BFLdsSBVEyDsbAe+R1cC4E+uOPPzobN2501q9f72zfvt1JSkoymwVjzknfCjQH0kF4B8bL33AyDntu+ZvvuR/vER0dndGyZcvXp02bdneTJk2weHlClUvYUVIBEvPYY491eeyxx5765ZdfEuPi4ky8hy1vS3kFEP46AN9JrPGLkP3L8tkEAhdo0KCB07p1a6dNmzZOw4YNnVNOOcUQig75FXiGZH8p4PYu7O8wtIGRE7g0Bn9fiR1mAnBtsy0g3Lt3r/PNN98YoHz00UfO5s2bDRcCeIFALM5lbxLaNHgOnEoGCoDB37wP7yF/SkJCws/Dhw8fPmDAgCWJiYkeZJWgo6QBxPXJJ580uOfee6cmJa1sV758fOQxbyxTbnMuGZoFYwHtXRsiYfGlgMpkKrGDha5Ro4bTsmVL5x//+Idz0UUXGUAEY/3S+wRDhPmhl0BWOPv5gHbXrl3Ohx9+6Lz11lvOmjVrnJ9//tnHYQUwe/yATPoX8wUQFKJvNiRC8fPIKEKk3Ld3b0az5s1ee3DSIw9deeml35YkblJiALJnz57Y+a/Nv2706Humph47llClatXwfXv3OuFhngjW3A7ELmT1nAhJ8rg83wIQILjiiiuctm3bmp+IZsjikr+1++YViRsqAOE9xGXsGC6StZiX9957z1m1apXz/vvvG/AwJ1LANc7c9DSAkpGVt68wOyvLqVylirN/377s6JiYHydNfHjMrbfe+k6lSpUIigz5oyQAxLV58+a/j77nnhlvvPF6q/Lx8REQ/d5ff3ViYmOdjDRPSEReHITvsF5xHcTCzgdgIAT+lqjQvHlz59prr3U6dOjg1K9f3+cg071lSrVDN45nBy8Magjm+TLr8tN+d70P49+6davz7rvvOq+99prz2WefmXlhzuBAUvrhsICM+ROXCYvIe4MyZujMTKd6jRrmmt8PHsz6R5drXp788MMTGzZsuDXULV2hDpCY/5v7UtcJ48ZP3vb999UjIiMjZVVisQ4eOBCQg9hmTxGEfAQQAYrlVVdd5dx6663OhRdeKLu+OZXvMW1KXwFQduiHFOjCIPyCuqctImlMfCauwvhtMQyusnr1amfOnDnO22+/bRRu/0M+HuP/ceete8NBKlSsaNKLOdikUo4ezapdp86PI++6+65Bd9yxmDCWghpvQd8nZAHyy5Ffqo4ZPmbySy+9fF1WVla5rMxMV3RMjNnVD3kXLa5cOSftWN5RDhUqVHAOHDhg5g19QqLFGWecYYDRv39/o1fgj+CQoq+gxLxMsNqRC3pRCvJ+tqk4p/sq1grdjN8hYA7CSnbv3u3MmjXLefPNN40Jme+w0KG3cLBJpaZ7IoBzO4yZ+OBB83W58uWNSRxOYjz+WVkpffv0fXTKlCnTEhIS/orEgpyIE7xXSALkyJEjVbte2/XJ5e8vv5Zcjbhy5Vxi9VIYtQuG5aUhevO/WVR2Qq6pXr26M2DAAKdnz54OIOEzEQVzaBOUP3HJ3yEfwwnOebFcJiDwcBv0fG7Hm9lWMDYLNqRt27Y5c+fOdZ5++mnn119/NXoKGw9zmh2gVgQcJDIqyswxc5167JgT4Q3N53fH7WS1a9fuuTfeeGNc+fLl9xXL5OTx0JADyIoVK864rvt1bx88eLBhxYSEMOOzwGPszeJL9+YsoH8YnSArbxbPgrM7VqtWzRk6dKgRpXDgiTCYG9u6ZYNF5uCc5s8ONgy1RbXfR1a73KJ2mUPFg4mDylSLSCmPPOfgkET0mj59uvPLL78ExUEACGtlwAA4Ce/3Vm9BAgh3hcHV3QkJCZ8vWLCg1+WXX46VK2SOUAKIa9q0aeeM+fd9SSlHj1aMjYszO52cfICEyYWAjWcc82NkZECAoGj27dvXiFJnnXWWmXiJRvJVQDzaVUX4toVKDjvOsYkpZFYxjxfxB7nmUxYtLlUsmR0BrHmSniVfDn9//fXXzvPPP++8+OKLAUUs7slaOS6X4UZ2EKcxs0dGmblnIyT4ceLEidcNGjRoRajEc4UKQKJHjxl93eSHJ0+PjIqqGB4e7mLHYYdBXpVizqIpv4EFNiVxHE/KqQIH+UyhD/gv2O3QPbDHy4lnZ/+VBCIvzneEm8gwARHLCYg3HU/9gEEDnbVr1zqZGRlmwwIEcGT+hutzvfLm/deR+8bFxBq9EGOBN2bs8F133TV44sSJ80MhjL7YAXLw4MGKI+8aOeLll+cOy8zMLBcdHW3cTsb8mppq5Fd2oDAmMy7OKNGYDeEmZjGOpRoFm0kWx6lZs6Zz9913O3fccYex9aOD2LkYwcRBFSdRhtKzbQ5k/85mg/EjoVKi88wzzziTJk0ySr18RRD84UOHHCQBAIOoBWCMFSslxfwNoDLTM8w6CoTeANO0m2+++cFHH310enF734sVID///HOVIUOGPP/aooWXu7Oz46rXqOH6xWshqZiQ4LN+VKte3SiHjttt5FmA8tt+gkUdJybaE8YucKBjPPLII0YZlwglQIj7CCxwG7uoQSgRZqi8CyKZQmmk6NsiaUrqMSN27vn5Z+ee0aOd/77yigEFnzG3+/d59G6chWxW0kWqVqtmfFno+GxwsjSiH6LrhIeHZ1577bUvTJo0aXSdOnWKzcJVbAA5dOhQYpcuXWYlrUrqSNxbVHQ07+ILzmNSjULuLZ6mMAg4CLsPB/b1Qwc9c8fEPvnkk8bRBzeRjM3iGmeVt7wnO5UWnN0qUBBgqBBqcb2HYtGYQ4XvS+xiHjOzPSVT2WzKxZVzFry2wBkyZIijjS4hMdH4qziQAuSs5Xyzjm6Pb4RDYJTFkvteeumlb7z22mu9i4uTFBdAKp1zzjn/3bRpU9vo2JhIJkQxVeXj431iFL8zSSlHjzpR0dEm3IMdCbELnYJFCHOFGQX8/vvvN3Is9yI0BAef5Fop3P6BfoF8BMVFlKH2XDtrUeIvc2di0lAU0lINJ+cnXPrg7787948d68yeNcsMpUbNmiZAkg2vUuXKZm34HU6DFUs5NQCF3zn4nWekp6dnn3322a9t2LDhdsdxijw8pTgAUqFu3boLfvjhh3bR0dFhaRkeJyo7OcQtFsxn8RUq+JxKMu/ibOJg9wcwkx+eZAIJAQw7GpOKYq9EIUXU2kSnBdeuGGoEGWrvI8uTvwWPuU7BmELC1LEUJy42zrx6tjvb5KvgYEQXhKMjATDfR70AYMMzjsnoGF/4vICh9eUna5qWluauW7fui99///1gx3GKNL+kSAFCyZ0rr7zyneTk5LY1a9Z0IWvKz4cCZxxx2dmOzTnMpKGcp6QYTyx5GLt37XIaNGzoPPvMs07bSy4xYFFylHQKPMGc6881ZMY1LN9bIDrUCDKU3scOi5d53C4GgbHkWOoxJzbGIyalpXtC4FHE4eD/+9//nH/961/Od5s3O6eceqrx0AMSLJRIBrAgnI5cg2VMFkbWVGuH0WXPnj3us84667lVq1aNKsokrCIDyNatW6PuuOOOT1asWHEOnMOY/CIjDeGXrxD/J8uGiRPKzjaAMO0BMjPN79p9evfu4zzwwAPOqUw4lpSEBF/xZvwe/oeUy5LoAS9usNhiqHJS7PyXzKwsJyzcUyeMA93CVEwJ9ySmwV1I4rp/3P3OnBdfNOewAfId53Au66ogSjk2JW5xvdJ809LSsq644oonZs2add+pp55aJJVUigQge/fuLdfjppvmrFj+/jWVq1RxGcsGlc5dYUZRwwyLhUP5GQqvlpgk5R2RatCgQc7o0aPNrhNKViivvOzLT5eszo6o4gi5ebMFAn9ulxs4bKJlA9GmoMxH/8Sp4gSZ1ggr1cMPP+w89dRTBhy8MxskxJ+Wlmp+570NV/GK15iJoROslxxVqlYltyS7U+er7n9x9uwnqlSp4lFYCvEodIDscfbE3n/H+PGzZ88aikgJkaBPIINCPOVi40weNToIyjXKHOeQvUc2nJms+HhDZHCNESNG+Bx+issqxPkJeOucLGGKlOViu6wPf0PcsgwxTn7PaRzsyCq2oBwN/5exnXj+30F4gIe5K+7DDnd59NFHjUHFcI6jR52s7CwHky+iF/4uQICoBY0kVqrkkSyys8130ltcLldGnz5973/26aenFbYzsbABEnHX6NEDHn1k8uTomJhoReJqoGbiXJ7Sm4BDIdEUNwA0cBAT9Zmd7cyfP9+5+uqrzaRyLgcmXzt2qrgJweYEOTkj8+IQKizBPSAeW4zRfVUpXqCT447P5bEOlGNe1HNk+1G0dijv119/vUesiowwIhbWLfm28IFBC8YM7A1R4VzpocbxmJ2dft+/x/QdP3b8vMLMUCxUgIwdP77HhAfG/8dxu8uddvrpnvTO9HRjnTLs02ypjiF4Jo/dTjsffo2ffvrJFEQgL+Hvf/+72VkQreAyTBLKWygcEKdP9vYWkNZ72SKQ/7tKEVVZIft7O0hQgLAzGTnXP9CQz/QuKncUCvNDYCObI7qi1pBqLGx4O3ftNMo7hhf8JCYFGr00Pt454s0hYQzyp2DMIXSI8yMiI48+8fi0DgMGDPi4sMZZaABZvHhxyx439Vh+9GhKHLIlYSMceMKNrJyebiwZTrbbsFEO1V+SV7VFixYmxPr8888330t2lSyfl4hRWBOW030lMtm7N8AA7BJx7Cw85G+V8zR7hLfDlM1hbMecSgtxT2MajY31hc6oRZttglXwYSgEV9prZJvgGTeZiwMHD3I++/RTwynQRZknmfQBCQdAwfdlKtYcPWrCjERTYa6wQx9++OF5rVu33lYYa14oANmyZcsZjc8956O0tLSamPqMIgZAvC3IYJ1YpZiMCG9OucrxwE3YGeEgy5Ytc/72t7+Z0AO4hb+nPa9w9MKYrNzAYQNDhQ0kYhlrjTfsQtezAWDZQYwkfgnnGFxRTjLmDL8OPwnTZ8eEkyqpi/sAFv7LlK0o3VALnbHDe2xxS2v61YYNztX/uNr4TXh3rJKK31JKApsJYhjcw6QvpKc7JM9xEItXrVq1r9evX4/rwBN/VIBHgQOE4MMLL75o8ebNm6mg7sJci87BweDkCDRhImQGuh1DDBAIugdJOJTTIT8akEBMEIY849wHwuLcnESMApyboG5lW5SUuy0iRY6Gg5Dv/fHHH5sib8nJyeY/4qM4T6AHMW+Mt169eiZkn9z5Sy+91JQgsnUyE0WbmWksRMYYAiEFqKcV6Nn5/V6g0JoZjuCNckAxR9/4cecOp3OnTs6WLVvMWv/6yy8+kYrzfbSClFGunK9zFptu1SpVjTHn3HPPnb5+/fq7C1ppL2iAhN/Y88YJr746/+4qVaq4mBRMdIrIZbB2KImiOflcijni1H//+1/DOdhVAI8UdTmfOF/Aye8C5vd6/2A+cQ4qHSJC/N///Z+pRbVzJ7XTPFYt7aqqexvoHWT25lpxCjYPKjj26NHDlCWigJ0CNv3zOgLdv7C/l9OW57BpIEori/EoDuBy5ZyvNnxlxvLtN984Jjj1l1/Ma5mQecq3RkcbDiO9BA5iTOupaYbL7tu3L/vmm28e8OKLL75QkLkkBQqQKdOm3Thy+J0vqriCCWbz1p5CdkT/0K6GImZYpuNJimKnxfFHxlqzZs0MRwEcoXDY1iIWhYXSZ8qxlsXtk08+cV544QVTTgeAByrtmd/xGVN5uXLOZZddZjzWl1xyibkl8wwh2mZo+3c58fL7/Pxej4dj/2/7ncqVKjtrP11rMj4RO6EXNlZTRQW/SWzsH0XCMzONCfjAb7+Zoh2ME+CFhYUdmjlzZvs+ffp8mt/30vUFBpDly5c37Hdbv7W//PprPAQva4Q84L7QAm/yPsCBRRIBCtGxeBQyQ3zQjhMKZlyJMMZmT4UOr4OS91VHJj4npILkrMWLFxvAs5tLhi6oxcrpPjzbWzzafI1liPgnKrR4cyt8IgnAVpE83j0U5pdwecJUDhw84CQmJDqffvap06pVK58RAyAzl95qKGaMoiUA5HJ7NgONp0GDBp8tXbr06jPOOOPXgpj3AgEI3Zv+eccd77z77tKWpB0jM5o2XlRXh4sAmJgY366GwoUlwiTV/H7IcI+XX37ZBB3qsGXrghhofu5hiwgiKplvST+dNm2aqf4BN4FY7QITEony8/y8roV7YDplp5UJXEDBIYfIKjFQOhHf2zpBYb1bMPeFgxw5esQpX84ThMrx1ttvOTfddJNRzO1weekiJsddjY+yPRxdXBOjYI8ePWa+8sorg4igD+Yd8jqnIAASdueIO4dOe3zaowmJiWFYIUA2h+q1mnYDR44YyxXKIz4Qb7U9EyZNgtPgwYMNm5RFSCJLfgeY3+sllihkwgYunn3M0GoLYJtjAYkpixOgg1V+3w9QAgwTKevlcirSzbsTmjNu3DizI8vXpGeGgphFVRRJEMrbQap4cvqTzqhRo4zFSuIUAEHyQPwyfhIig7Pdf+KgXp9a9qRJk7rdfffdb+e3MF2+AbLwrbca97jh+veyMjOrS+ZVWIBtRUGcEjdhwCzYz3v2OPeNuc+ZMGGCsV7JZyAfQKjka2AlgQgBLyCgejrxYFimeG8RpIqsYUVSXFRhe7ZtH4xCyiEiuyAFSvzkyZMd/EoS/+A6hPMU90HClX/52EOHDzkV4is4Y+4b4zw8caJTs1Yts9Ggc8jgw0+T5+P+I6ICndcKrd+1atWqdi1atNiSnzHmCyDbt2+veE23a2Z+tf6rrpToUYEwmy3ycti1OVC28JaqmNjt/fs7M56c7iuywCQoL0Qe1/wMriCulXgih9frr79uMuaoYws3RExUOwC7+DWLV7WqxwRZmIfAaIeHC8g81+TYpBpfgREFr7vuOk/2X7lyPkNDYb5foHsjYgkQnEu4fHRUtMkvYRwDBw50Zr3wgkfUogAdjlJvhC+iOzkocEKcjKwDm6o3hdfdtm3bOfPmzRtYvXp1jyf6BI58AWTkyJH9pkyd8nTFhIRIZHOzc2VlObVOOcX5afduH8eAHcpZaCIy9+0zjq9P1nziVK9WzacsSr6XrGybUE9gbAVyCWES5LdzIAqOHTvWKL+IgOzYEmvkBVeIh7zeRcVBFNCoviMAA6IBQJjElTMzcuRII3JxfijoIeIg0kPs7ETE710/7XYub9fO+EgYDyK8/GrouOI+zDNjZ8NC9MIiumvXrszHHnus+4gRI948UWI4YYCsWbOm3iWXXLLOFRZWgYhM5VwgiuAARAlXuRcjBhCQ6M3pIDDtzTfeNNYKY+OOijKiChPAwb0ACztyKBwQGGIgOe+MRbW57Ew7+Wp4X7t+r/IkCmsc4myaf5U/MlVhvEX2eDYmc7WdQy+hComCPgvr3YK5r52yq/NFC9AVm+SmjZucjp06mnRrWzqJjfXoeBHU3vIWl5BOxppBPxUqVNizePHi888//3xPvdTjPE4UIFGtWrX63yeffNIi0A6pXAh2YYIVWUAU2379+hkWX9yhEf7xXNppxcUg/JtvvtmZN2+e2Y3VqQlRkB0rUH+M41yPQjndvLdfDFP37tebcqKRERFGbgdgbG46QsEEzLuold7MmTOdf/7zn+b1CDuCsxtfVHh4nv1JkGi6XNP1qTcWLRp2Ig7EEwLI1KlTrxs7duyraWlpphJJXoca1KhUzA033GAAolqtobCL6f0ROdCPeGfFfVHHl2YzlB1CqQUg0pX4Gaj8f6FQ/HHcVPWo5I1GBCGsnJ24Y8eOzuwXPIUVGDNjE4cMlQqSsrTxkzpnr776qq/2lkmwSvWUNM3tYAPPzs7OeO2NBS2u6XTNV8cxdebU4wbIzp07a15wwQVJe/bs+ZuIPK+HsnvB2mF39O9DyaX3hkzAxR0rxLvbAXWypgFo9A2sP4qYNRGk3rZjKqOJDB3Kh9KMVbpVKQWqIjN0yFCjvCs+SgQZKn4ovQ8bFiE7Xbt2NZ52VWMMBBDWEWW+zSVtXn194ev9j7dxz/ECxDVixIgx06ZNGx8ZGemyCyDkRiSqtMcAQT+eXnQTdt9Q0THsnA0WhHfmXanpa1JDvU1j5PRTawTDZUIcIIp5MmvlrSeGLqg1SE05Zurs9urVy4BEEcP+uSfFtQkwx0pzYKMiNwiR11cMMMD8M2Zvqm7Go488esPIkSNR2PMWe6zBHhdANmzYcMq5556bXLNmzXjClZnkQEqoKV6ckeF06dLFdC+SzuJf9bC4FsAmenQkQssJeeF9lf4rYuKdVa8p2A5LxTUuPVegkPPWFJK28nKyMz1GB6KnCU8hfgxR0r8WVnEOVDbXAAAgAElEQVSNw19H5L0IaiQrEVoK1J/EagFHau/GjV9tuLx69epB296PCyA33njjva+++uqEqKgol+Jf+JnXwQBRquiwevrpp5vdWApwKISr24UfsKMjOtGCja6wMhnKcanMP7VwC6ZHX3ERlp5rinzTN92bZMR41X6AcypW8PROIRr4888/N34blW0NVGSiKMbmH8EAzZAqQENVIqQD6YBmg/4jizVryOAhdz7xxBNPBctFggbI2rVrq7Vs2fKHatWqxaKw2l7bvCaK3Xfq1Kkm0pSDBSC0PRRyFXgfReVC9EwmRQXuu+8+s4uym0rXkCwvL7XMqYF2sKIgoryeoUBG5XeruB6iiwFPapoRIxk/DtAnnnjCrBFOzlCpGqNwH3F4xkvB7GHDhgUUcU3hORzQ3h6VaWlp+zZ+teHsevXqBcVFggWI6/rrr39lwYIFN/ByqrIeTLTqxRdf7KxcudLIkYgz+Dok84dKyqw4GlyDrraMT5583tluyyZAKSAx0A5W3ACRiKX3QNQyKbneCvm0H0AhVz7OihUrTOi8JIPiNsNrviVtiMuzcfGeqz78X8ApZg4AiNK+7x1z75CHJjz0dDDFHoICyFtvvVWve/fum8LDw6MhFvWIUC65Qo35XEFx0j2+/PJL0wOQHcnfYlQUAAmm1pQWgTyUb7/91hAHwFBsWV4r4M6jR3jAlQuBEyj9CUDUBZhELNZMTt7c/FzBzGtBDU9OULvwH1wOjtKsRXPzGOW/ACR+Zzxq98b1EpfZGGrWqvXbig+Xn3fWGWftCPSOwQAkrFevXo/PmTNnUIUKFVwQNROKiKEK6gqAU+Ccytljt6ZYGKZFFVCDGHMqaRPoRU/0+7wWUr4O3o1ErbvuussXOxWMAYJ3KukAoeySDBWsJ4Q0ZcoUY8GT01QWI3sNihIgeq5dgwAgsFnfe98YZ8b06SZ1V7GAatyjmDRxDuWREKoycuSoIQ9NmPBMIOdhQICsX7++9kUXXbT+6NGjFdUnGzYHQOw2AgaxVrAhDkCSiBo1amTGx+BsfwKfFScHsRcYpQ/7+rp163x54sqTDxQpUNIBQri4CR79/Xez4bFOJK2R+KV0Z9bKHyRFBRA7olv6H2uiddm85TtjfTN1tCi2l5FhYrVMnJa3WIZ8PjhHVcHz1FNO3fLJmjXtatWqtSuvzTcQQMKGDh364JNPPnl3XFycC5HKhBh7i3nxMLE9ZatJucXJNn78eJ9jTS8hrsPAVYX9RLlDMNflFDLPZ1pggD579mzntttuM6CXM1Dto0s7QDDzUhkFgCjGjHmVb0Tm3pwq4RdFOgJcTH4niej2O5FCMW78OOeB8eN9xeeMvkEcmtttQlG0ebO2bMqsc1pqqnvaE0/+c+jgwYQS5NoJNk+A7Nq1K7FZs2ZfHzhwoIZKRfKS6BkQOgCR6MRLKPEFnePDDz80Zl0FkeVEaEXFQezdT+AQQHgHFHO4HWOSY83erUqzDgJAZM5lnhg/Y2/durXz/vvv+6QEAcR/LnMSv4LZuII9JzdOpfXB6EBVlEvatDFmX4UJIVYBDhR0X69Lb0tq1pz7Nm163poPli/vXLFiRU8j9xyOPAHy9NNPXz9w4MBXKleuHIbTjB0GZCoAkckEGHhgbYBgJiXbjnP9q63nVGQt2Mk6kfP8dzkBRLsQYhVRxYgZKn2q6iEng5IeGR5h1snOoVcaLwUoVLRPsXRFDRCJ59pM/X0z6ZkZTmREpPPAhAeccfffb3JFWFsAQpoFYzM6ltttfEGmuRLlmDzVPTNfX/R6h2uuueaD4wbIunXrIgYPHvzxmjVrmssCAMHISsANIX5AIisIL0MpmjfeeMPoHgxKeoosEdoRJKqdCNGf6DU299DvZAbip0HMICFH1hsmmckMlDJb0nUQAMKaaj5YF9abucBo8eCDDxrw+P8/0TU4keugIxXkAyDa9EyclTcj8bst35noB/JG5PuAc5iqM94e7XAbk8Nz5Iiv1tYN19/wn3nz5tGYJ8f89Vw5yGeffdaoRYsW6ytWrBihTC3bo6z8YV7czqQbOnSoyTVQpps3mtLMS3F7ZnMCyNlnn+18//33BujsNKoTLMU0r3c2AT0l3MyLiKXmQ4gn4vDMBfWQv/jii2IHiL8UIECbslLeNtV0tbr7rrudKVMeM0q68VN56wGgrPM3CrxREayqjFWqVKF06bkNGzb88bhErB49ejy5cOHCQcHEWnFjxC8UPQqmUQEQscvOLziRnaMgr5GJEEOD2g4TWXxd9+4lnsjzM0/kdOd1LFq0yFSbATBICnBaiT3FveHxHoCHNWVjw4eFuKx3DUYCYAyjR4++5YEHHnglp/CTHDnI1q1b46+66qodmzdvrhjQikNrZm+oAh1m8SeoMHNRKOHBEoc8sXbt3IceesgZO+7+YG9RKs8LBBAyKe+55x6faC1pIRQkAt5Btb+gU/J50H+fe+45I2YpjSGvhYNG27dv/8G8efO65dRJN0eAzJo164p+/fotdblcYYF2CTn+QO0777xjknDsJJdQCWn3D4yEw5G89e57y0ol4Qc7qEAAufLKKx24iBKoZOUqDh0ypzEpbEnh+YiEVG9hkwY8gTZ4b+G99AULFlzQqVOnvyRU5QSQsGuvvfb1RYsWXQ07lWUntwmX/4MwjeXLl/vaqcHecuq+FOzCFdR5kl+lf0jJwyRIROjuPT8V1KNK5H0CAYTwf4gOp6FAIcnA9mwX1+D1LmzKiPm8E/F/pCwg2QQq3KdeiMOHDx86ZcoU4rP+lAH3F4Bs3769etOmTTcfPHiwAqZPxVsFAgiWoDvvvNPn9wiVSFB7EZWDAliYwMsvv9zBTHgyH4EAgnKLKZyq8vwOJ9GmEwrpChKzeDdZTP/zn/+Y9NxgwoWgcSx2TZo02ZCUlNTW3yfyF4AsXLiw/XXXXbeETrSKsQokwxHgRsQuqbQy7YYC95ASx0/Z+QVcqq7379/fobLfyXwEAgjriTGjc+fOZm3l75IVM5AIUxRzaxeYQOQikBEuQg+WQO8nFSI8PDx12bJl57Vp0+Zb+539ARJ+6623TnvppZcGKo8g0AOYtJ49e5pwDXZo5U9ISQqF5H+7vpb0I/k/sty5RhkUxdoW+zOCAQj1wKinpVJMocI5NHl26SN+hw6HDx9uOuoGQ7/eUBT3sGHDbnn88cf/1PPwTwDZs2dP5SZNmny1d+/eWgq5CLSCAGDGjBkmlkm7s1oXhIoVK6ey/5TZpw9JGQfJe4VZQ4iNCF8VcggV6YA3t0VoKewYYMhrIQA1kJFJohngP++8895dt27ddXT706z8CSD//e9/L+/Zs+e7sbGxYVwgZ58dHKbfTWX2w4dNFyhSNVHmTEu1CE9z+FDaZewFFTu+8cYbPSVkIsID7QGl+/vsP0RMhZHY4SQAhHKldBm2TaqhUPVSC6ONGZrjP3RL3SyifHEC285f23Gt2DN0Km+E8LGkpKS6zZs393Tv8Sv747r77rv/PXXq1HGSL230+TsM5Xnu3r27Kf0PYOzIy1BJ+meQ9mLKNt6tWzeT+F8GkMAAwVFI+JBdSTJUpAPW17aq8Y6mE9WRI0ZRpzieGh7ZuqhoW3q2zNdPP/30pXfccceqnAAS1bJly/e//PLLi/UQUxiNXtbeMAx+13/ldrz00kumyoRirWydI1R2GbFh/eS9OnXqZMzSZQDJGyDQAkUs8HGZ2KfMTJ9PpCjC3QOxb39Tsx0Mu2DBAgdJQbqxSTX26iiKueP+0Cxjg9579uw5ce7cuXiPjbnXJ2IlJyef1rJly+SUlJRyAoFqu4JAAYIbK9SdsHYiPikUbINBExcqAJE1i8kxhQrS042Jl5D8MoAEBgjOQqpLKp9COUChAJCcfDISuUiEo/UDPi91W4YmAYpoWuCACSB+N2jQYPPq1atbqMCcAOKaN2/eVT179lzkdrvDVZSBieBmSjjhJuIooA0iI2fAZr0Qo14wFCbQ3oEEWN6XHJBVq1Y5rvCwQJtU6f4+gA7CXBEli76mKpih5CgUjdl+N9Ej9EqhwiVLlhg9RDkkqgIPDUPfdjRIdHT0weXLl59/0UUX/WBzkLDBgwdPePbZZ0dnZma6ZOKVsm36w6WkGOXb9kwSozNx4sS/9LqzKxWGEnXZ4oEmzgkr4eG4+Z3gIADSu3dvB+ebNkeJNaG0Afpb1mSMIauV3CRZvMQ54CjQKUwAmpZ7IisrK+OZZ57pcMcdd6y0ARLVvHnz9evXr2+oUqHSQ7hYALGbRfIAKiXCfv3L+ISKF120o4Vk5+M/k0T5SnbFk93MS066TyF1eTYL24oFHYwYMcLUC1PUbH4xWRjXa/OTlABAIHoc2Bhk1ORIAFElHklH0DP3SE1Nzb7lllsmzpkzZ6wAEnb48OHE2rVr7zp48GAMrnduJre9AMIDCV/HtMsEYt799NNPTdVEvZRQHEoWDu0cAj7jgN3iRTfOzZPckx4MQGgGStMdu5lpqHAPf24mzgFNsuakYFCEYseOHUaUUkcwqRGyXkETKvd0/vnnr//888+b4WZBBwlbsWJFnU6dOm3JysoKE3GjvMhsKwuVZDV+YgVauHBhkZbwOdGdxw5YZOLYRQg16dOnj5NQKdF0LSL5n01BFTBUYE0ZkCf67FC/jrI/jFFpAMwBhCJiwjnIRgLHFfeV0aOw89ELYu5Yb6K2CZeRP0SRviZWy+12SLby0QhNUStWPLDm49U1GjVqlGEAMmvWrNb9+/f/EDRJPGKCxLZEJHymYDWameBBL0mH7ZtZunSpUeDCIz1WLdvByXhl0ixJ4zuRd1WoidbYjnqWxZKNsH379j4iUlxbSQAIc4KISDCtUsdl4jX+Pne2r/CIkTIQwaOj0z9YvqLKhRdeeASAhA8fPrz3448/PtNuLq9ymwoPtz2QENP06dOd22+//UTWpEivse3ktpJOr4k2bdo4v+791XAPY83ADBwZad4vmGSbIh1IIT3MneXZPeW/0riVhospH38Rgaj+AYqhEO4ezLTgLIQDqi034xWnJGWaFF07MDc7K8s9Y/qMZgMHDvzSAKRjx46Pvvvuu3dKLlOGoCZNrFXJ8+QGsAOTmBLqh72I4o6MA8PCpZde6nz2+WemwoVpQkrOsldRpQoGDesDVa8P9fEHfL9st8/MqY1BPVHQN4mKfe+99wxByWEs/TSUwonyGuemTZuMHsK6A3JfaVJy1l2OWWcKO1AmyIwxPd0ZOGjgAzOenDEegEScffbZy5KTky9jYqR3qPq6vI/aUXhIgwYNjJNN9XYDLkIxnmArkzIiyOoGB5z5wkxT4YIdBP0DDsIYaREAcJDBS/MR5nh8XXbVElVYZL5ow4worTmznb+hZozJbZ1Q1ClfRFyW9A/Ruttx+wpbAxC1i+jQseOqpe8sudz19ddfR7Vr1y5579699SRbMnBEKyWcSPdgx+A7Qg9wvvB3UdbZzS+h2iZAxEmjqPftY3YOeYfZQUzPcfStIBoE5fedivt6lHTfmL31BaSkQ0QvvPCCSWdQmoDNkUPFkpXXHPK+vOc111xjyqkqLks6FzoIoEB6UPUT7nfmmWdu+XrjpkauZcuWlevevfue1NTUeHENFS1WXAsXMInyI/jvKsW9yME831ZC5RiiAkvbyy41VcIBhK8Lk7fQGPc1XVRL8UHZH7tonu3roiQSLc/OOOMMHwdhKkoCMLRkMsxQzIFC6jI8IFKbzT3M5akLRviJt3MxIIqJifn9zdffqOKaO3du4m233bYnOzs7GmBogqSwq6KelHUmh7q7/A+VVsHB0K8dHqFdkDFd1q6d88WXX5jK4ABEVhzFbJUUS00wc5DTOQCEni2IIRymz/2hQ8Y5TDgOEc92gB/nSMIoCXPDevK+1BqmYzGggDOiX5kmUOGmTq/RPdUywdtLJGPlByvjXI8//njN0aNH0ychQsGJAodCTbRrSH4jshM/SKh5zIMlEtu3MXPWC8YMSHg0u4hK5FPCEp3kZOAgOHvpOamUBflFtM7BzmsongeNIv1gVCJs3+aQJnQqy1NVUjqJClO4XK7sl+e8FOsaN25cw3HjxiXTd1BBXiALpYxdVBGw8qgDIgo9k4wSStG6x7M4NkC+/2GbCcbD7EtzFQFECpvm5HjuX5LOjYrwdByGMCAY5oY1btKkiWnsSb/CknxoEyfkhJJUpuKitxaxkYpcHo6oEBSl6GZnZ7ufeHxaguu2225rOXPmzNXR0dGmOQ4TJIeh9A6hjp88gA5Ef/vb30Iqa/B4FvFP3nGXyxk5aqQzdcoUY80whojMTJ/iXto96eVi44y4oWJ/jJ+Nj/7w1OYt6YcAsmHDBmPWR5RExBZt4yiW+Vefm8iRrCz3qPtH1XJ17tz5H++8884bMTExPg4izV9xKvJAInrRPQq7Mj9Lih3cf5H9AbJh4wYTus/OcvjQIVMF3KQU0yiolCvpxGJJ35L+Ubt2bZMKwM+SfkjKQYSkpcP27dvNJi9HIQAx9I6p25scyJixat3ap29r10UXXXTfRx999AANcqSDSKEVJ7HD3xs2bGgKiUn8ClQ1IhQn2AYIXWpjomOc0feMdh577DGFGnhqDR88WOoBgpJOA086+mpDpCTrvffe+yfLVSiuYzDvpE0cMZLkqa++8hRPlD6tfCAAIrGa7+lQddXV/7jL1bhx4+SNGzee5R/daEfz2so6bIqKEQpuKwmWjLw4SFpGutlNdv/0k3NBixYOLa4V+VtSQimCIZTczgEgEAvrCBFh2l22bJkpwsFREjdAe6wKtGUcl1xyidGfbYBg5jXiFqnEkZE+hykAuejii5Ndp5122rGdO3fG2D0GbT+IHiDEERk5b968kCgreqKEYXMQwt1NJfr4Cs7kRyabvAfk1NKue2jucBQiMbBJsMZwUSIMmAPMv6XhYH0RmbG8An7lqKOf4EnHvE94CT+ljwCYc5s0OeqqVKlS9m+//eZStqC6SElGU7cl6SHUv8KmHKpZg8EsqE38pAsxScdSPHkiZzU6y+QOqImM7SwN5t4l6hy348RERxvTJ7XMEEE+/vhjX6adUmxL1JhyeNkDBw4YnRlvOqZrpB9fBmH2Hz3UBRTd4swGDRxXdHS0SSmTYq4vJTrZcTooPBQRw8Kh2J1AhblCfXLlFZbTc+3atU7btm2Nd5kSljY7VoI/O48aX+Zn/AXSgMedd3sTAI7yzS5qi45sAISPsL40XgUkVHGnCLkCNDF9lvSD9VWESL9+/UyJKjEDE3PmeFMbvM11lAfEXEEDcA5fzmVOYoUIiAt4ECUo6SDFofilkjyJjA9uCDEozRhCoVgayiuiBhuDer8zZqUgB1P9PtDc5LeFW6DSoeo3aANC7eYQq/keBR2POY40+b8UAl8SdUx/HUQAQfohtkyBt2bDcDxuDXWfssUs5owGIG5xg5yUWflFuBm6yd13320KNdjACUQEofy9LHbKg9BcUE+JLDRxV32v2B7lFuSXgAobIN6KgSYsiMME5mVmmt8BOutIrgRisw6JzyUplCg3GmN8yiIlyW/mzJm+Vt/QtJ0wxT1kkOI6Ng+Xy+XyAcRebMUkcZEmGSTiPBJABJ5QBkCw7yaLFRyDnQPioGMWuRC0s0Yv4YCr0MnILlsZ7DNyOq+wAQKXUMg+dQSoFcWh8JKrrrrKbARsfqwvnFKbRkkJZ89r/pUZC9eg0iIcBBCoognptkTxStf0Ve5xu03HXMNBJC7luIB/1C01E1gaAaKizArp1s65detWU5QbpxmgYfelcIEMGfK8hjJAtPDiHNWqVTP6CGOlIg07ql34D686sndpsWLlGyBRUVFucQuba4iblHYRy79ur3LuJbfiWKIu1Pr16w0wlIpMjBJh8vn1ExQ2BwEgKOHoGRzSP8477zznlVdeMclvNhi0OWizyA/4Q+HafItYcXFxbmUNKhbLzi4r7Uq6nYYLscMhsPogn0JUpBcjXl1//fWmzBG77e7du43sHkwHrkBEUtgAUYsx3oN337Vrl2k9R00wRC5C2xkvNAD3wPch0aqkBqPac25bsU5ISY+Pj8/OysoycVgqzSjrlMyCAkxpNPMymSIS2+sq4EhhJdoXCx5Zacj1xsnkrX4SCAR5fV/YALGzQ9EzsFQ9+eSTJs5KKciMg98ZFwdj4zrAVdKPfJt5Tz311NRdu3ZF4zjRjsHkMFnIqgoDVjwWtmTkVsntJX0Cg3l/FUwDSKNGjTK2dHZc5ghRRDkEsg6pRCf3Zk4R2xS7JmOAuDbBcnkdeHQJorPTn1Vhhu+oe8d7KFREoFVclRy+rOOwYcMc2jrzu5ocBTP+kn6OaBUpgIrv0LqkpazsLJPiwEbI52wOrB+e9TpnnOG4GjRosGvz5s2nKGFEXMO/Hq/kb0yCtDzgRkx+fs2coT758sLKqYayTp1aWrgx8Sao0ZuNh3zP/HENhCpvLXNk55WoQgggIWEnr0NxUiYMPT3dnKrqGzyjfFw5IxZyAApMk1LMtenxkxAadCneDYDIP4J4VdoP6VVY7PCks1mpQgt+EGUSygeiwg1nNWp0wHXBBRfMW7t27Q0sNCiSs9DuM63F5kGwaBxp2qFCoQdhYS8wZl3Muxz6PTk52cGu/tFHH5mNAg4LYAQEGwRcp0gFia/K7w/UfkEcRwU1xJ1YEyMSZ2aZtbBbHivhje8p+Pbcc885derUMUYFBSGWFiU8mLWXZESSH+06mFNVWWT+BQg4tULhScNt2arlV66OHTtevXTp0rcACDeyF1g7EYvCTQAQDyHgS7VMS0M4QjCTDMfkv5LGxFFefPFFw1FR4DkgQL5DHLOdcv6hOWLxgQAiIwn3ti2LFLnjSKiYYIAp4KhtN+Eyt9xyi2kgw3fSLxCtWDs2wJMiWtlb0gi6bty4sbNt2zZD5ypUwfybKpremmjiLgDkyg5XPuO69dZbz5wzZ85mW0GTHMuCKOWW3yEQ8kFIX4QQQqmZYzBEfqLn2Alk3EMbh0y8VEd5+eWXnTlz5pjWwxxsHOIizCfXsEiKc1JZJcLt8zrsPpFyTvJcLeSB/b/96fJzzz3XoUEpFc3hGhyq4CFur8LOKshxovNSEq5TPghpDMwNGwRrYHMQcWfGozQPANKzR88BrmHDhiVMmzbtN1JuOVElGOUEs+vz8hmiRlJSkmksX1KLNhzPwto+AuaCTYHJ5aBRJEQH94WzENxI59xnn33W+eabb3zBgXqeCFJzq6IBeb2PLZoZUc3LOXRNVGSU4SznnHOOc9NNNznI2ZhvbY4iPUMGA3Gik0HMknhFyi3mbUUM+LqmRXhqoikF1+cHS0tzhg0ddpFr9uzZMbfddtuRsLCwcAFEooEsL0KYlPIPPvjAadWqVYlNuT0egHAuSjCgUIgCQEFZtw/EHLgEnwMqCuvR+BLRC/+CqZridvvEJObUpBIEUNIBiOK/uEbg4jn4LC65uI0BBboGRgI7Ddrm8Ih8cCMFZUpcPN65KGnnCyB0QqNYuc96leXR3WRmZ23VxVc4eHTyI3Vdzz33XOSQIUP2ZmVlVZQoIICoJ5087DL18rB27dr5HEolbdKO931t/4iu1ZyIi5rAN2/RC9twQQ70Z599ZlrV0S4bpyOA+1OeSR5NrlAclS+NR7xevXrOBRdc4LS7rB19vZ3q1ar5xAL5L+wCDLbZV+KhRMOSnNMT7BoKIDR7okKkNhhZYbPIR3fcngBGOk5589IByX+efS7R9fnnn0c2a9Zsa3R09OlyFjFxHDITKgOLh/E7Zk6yzkqDpzXYieY8Wfhs07byZfzvo3Ps1tjMF5akLVu2mP/8jv7COXAguy4ZHAvRjarqBBaeeeaZBhzEUklOVvZbXmOQceB4xlmazpWJl0KHVFZUAUQ4rSxWitRmXtVF6+jRo+6VK1fGuVauXBnRpUuXtWlpaecp1RZ0SQSQJ1aTxs0o44jD6WRQ0u2EsWAJxxaLJNPa1+bkO7J1jdyIWpzMNqIE44fyj7WzY+5KuxVSXBKTPCH9dq0F20jB/Ct7FlE0PDw88+233441DXTOPvvsV7/77rvrpGsAArtQg9ohyDdCoTXk65NBSfcHhcRQNg5x1pzO0WcSZ3Q+n7MwWhx5bvWZUcS9/by5RgQscMg0y2La1pecQMC9TgZnbl4bF1ybg3x0+pwwH0r+k2KuaAOtCfNar169H7799tu/GYB06tTp/qVLl461On36Wj9zc5nEVPkEto+VRk6vYHfWknjeiXAQe5w5+Rrk5FNIj8Q3e2fXPWSiPdH8cBs44lL6yXesaWk/qIlFnxPaH5h6vN7qitK17ShtcZErrrhi0XvvvXe96ZM+ePDgLjNmzFiEqVcBi+IaTJ5uAFAkUxO8d9ppp5X2ufWNzyYuWx8Rh/DfwXUOC+IvGil2y548+3qJWP7ik7gXP7mHdkKdZ++AtlNRzwlGHCuNC7p69WpTdhRLng0QcRAxAPmXoPH+/fvf9dxzz00xAJk+fXrzIUOGfBIREWHsKRCDwhXE+gEOQGHXQyygGDB9Qk7GQ8o6Y1fkgYjP1h/8dQkRONfZxOrPif0BxRroyMlQIDDmxCEkc9vvbK/ZyRAq9MwzzziDBw/2FRph/Ihexszr9lqw0tKMDsJaQN9Tp0694M477/zMAOTDDz+s0r59+1/S0tJcihQVuhTUZcuy3ACLAAF7pf1AyVOojQhVXnF+2iKKLSKJIHW9uIaIX7FYMoLYCqPuI5MkC8eGpUBSOzWBkAmbo+m5/oDICcClfe00PlJtiUeDhu251Zxr41JzHSq7L1mypNLll19+yAAkKSkpvGvXrikHDx6MFKq0q/G33X6Lz1kgrAI08tQOVdonG/MfCVTIsyQd8ROHIH4OcVXmif/y1kox1/fsWvKViIvob+3+fC4vuHwrqgmg8BIBhp8619v0xeiOcghyHQlfgJifhAfhZecnfyu8qKdgUM4AACAASURBVDSvHXOOUQmJB1r1xcB5AxPlFGQO9H1cXNyxpKSkiueff36mAQhfXnjhhftWr15dSXqGSotq1+LGfIfSyMSScvr1118bsUveW//QBZBZVHKvBm7L91KQbROqv/iiblNSnKUM46cg3ZYQBQLcNm7caOKs5BG3vdt5EVig8ecm+viLVCdKxBLzbO4GQPCrUIyC+CQcj7Q70FrakcjyG2i8NqdjziVhcH9JGbmJgSc6hryuky/I5u629EP2J2PDOauxqIyT0gRkrDCt99xughp/Wb9+/SloGz6A9O/ff8Xzzz9/KSybE1UqBeIXUUnr50GAhf4RVMwWh5HZNyfLTWFMDvfkmdphc3oGgNbOa5tFJZZowZkswkLYaWhQCmfgWkU4C+w28djcILfx5RcAgQAWSIeQP0tEI287n/OZPMqABUtP586dTYVFvPYiHOZAsrrGKfOpOJg9/qJcfxuMWiN+qqYANEqNM/UEkUREqI6ioHlf5UPRF+S66657Z8GCBV3wDfsA8vzzz/fq37//LFmyWHzJbEyCOIoC3vj7kUceMRl24iq8mCwrxeWA0uSwYLJY8DuTwCTxfjJn895r1qwxRdP4T0kcOztPJl5ZN7iP7c+QOBRoh8vr+0AAkpUst3sEApAImevtjUTWSkkI9uZB6R/yfohdIqQIEc0O3bfXVsou8yILp7hwUUsQUgsAh4ge+pwyZYpPIefdkHQUkyadW3F2LPEjjzzSd9SoUS8ZMVgi1qefflqnTZs236SlpUVrtxHbktjCC8g5hqjRvXt3Z/78+b7mnpo4O3U30AIXBGfhnVjwnECp8HLeXWmr3377rSlaQINKxCgBAe7JQquOFMGA4qDSI+wdSxtIXmOQaHKiHCbQ/NmZijk9A+JmDgQUzYOAxYagjEgFZBJcqVgxoraJYSKvBLO+NgvGpSIPeq7tM2KeJIUUxBrndg9xK0k5vB8AEEiJ4CVJStUUlSlrcz6Jh2yY4eHhhz744INmbdq02fongGzdujWqS5cu3ycnJ5+iSbUVGC0Un/FwiAg5FnGE+CA7BVc7R1HEaknMkcggXcLWEQQc2jZQ6gaPqgrBAQqJUbpG7y/OqcXxtzTJypQfAgjEQWwTb07PCXS9WWSXy3BOiZX+XFCc0OZGzBnrDNHAGUhz6NWrlwELpYIU8q9mmLYjU5y6KAw4dvSydCLloCMmN2/e3GSBqnuBwty1UciKqDis2rVrJ69Zs6Z5zZo1TSlKHwfh9759+z4xe/bsgXYzHVv/0A4Bu1VgIwTXtWvXvyQRSRwJtAPmh7gkOmnx0YWkdNvchEhaeqKjX5CTLfGLRWWBud7OqJTOwuTxO+O2d0dxrGBk7YIg8PzMkTiBpABb2ZaPSxKDglRlzdG5dpYk8zpo0CBTUI8NUteKQzFfgfSi/IzH/1pbSdeGrBhB1pygWomXynXSumoDBCzeCpTubt26PbBw4cIJSOX+AHFefPHFK3r37r0kJiYmXPZ7xcnLRgxgpNxxg759+zpPP/20L/JXu0YwxFMQE5XTDsJ92UV++OEH55577jFhMYQZCBgCuGKdmCD5NjhHeTAaq4jM5iTMARNsy/g5jaewARKIg5AsJfFQpYr0niJuOchsxVsWKeZGdX3tqoxkK+KdxhcGgBQxID2UZ6gvR0Gsc173EDBUmYR3QMwigeytt97yAVbrLO6hoFzmhw0yPT09a/LkyZ1HjBjxnp5ncxBMmlXPO+880m8TIDCVR1E4sEyF2o34vFGjRqZwAYqdLWbZhFvYEyTRQYuD+ERpIsLy8V1ITsdywTnSMRATtGva7yjLD0TCItvKLcC3RZRAHDKQEh2IwANdH2hubR1F47BNtxJJtcva0a7aaTW/+imRjfvARYYOHWrSfCWmQGxS+vP7/oHGx/fiGKyrNxLXpBKQg454pfEq2JYNQe8q44PXJ3Rs/vz5Z1999dXbcwQIvpKWLVu+sHbt2pu5QMQQ6CUppoa1Qw+Vd1kyYaDr8/reVop5H3Yzyb8mPD862sTYxJWLcyLCI0wm37/H/tv58osvnPLx8WYnKTsKaQa8DXiYY2pO0TcGzqIAS1mItInY1eILSj9V7w4V/0NkLh9f3nn5pZedXr17+XSvHGfAdE9y+6qc1K5d++uPP/74ooSEhN9zAwjVA7tMmTJlYVRUVJh8DHlNLyC48847iV35kx5iE3Z+l0dWCSaaHVF+F/4+lpbqxMbEOj/9vMeZ9PDDzozp083jymHnpmlMae9Sm9/Jzef1lB1S7V8UeUACN+FgnUy3YG9BbO32bHRwmYIQwyl6QV4+BeDCw8Kd9AxPxUsMCvNffTXg+tOCDi6Smprq7t+//7hnn332YULscgVIUlLSKR07dkzOyMiI93es5TSXAITwd6xZiFmyZhRUOqc9ubbYph2ITWDV/1aZ2LD3li1zYmJjDZvFdCnWmk8aKLs8jxmIi4k1Yqhq+rKZEfv0wAMPGODYdODPNQqCRsjpR3LgOHL0iFO+XHnnuy3fGeuVDDB5LSAA8Uo+KYsXL27TuXPnL+zz/6SDeL+Iat68+Ueff/55Mwge1pXnA8LDjaJKthZlSTn4W/6SgqAuydH+1hEm+MWX5pjsxt27djmJlSoZfWHf3r0mt1ilJAviHcrukfMMwEFOOeUUI+sj8qreFEU9nnrqKadp06Y+PU7R4NxJ4lcgI0agefe1R6O8UeoxI008Pu1xZ8Tw4UGJ2BFwnfR0ahV/8uWXX3ZITEz8E8HnBBC6SF37yCOPzI+Pj3cFkuGVjUVBObXYlaxZUJ5Uld7hfihf5GgTGoJYN+HBCU5lb6s0Ff9CruQo00ECkVf+v4+N/qNBj2p4yUFIYCQ913v06GGUdgwmKpFUUEaczGxPZieSDP3uf937q+l7QgydrJF5jdILEHe/fv0GzZw581nT09U6cgTI+++/X7Nbt27bjxw5YqJ78zrMi8XEGFZKDw2C3zT4gkjJzalINsGDTzzxhAlhNjUp3J76qqbaYVaWk5CYaP7+ec+egDJo/knk5L4DHAQTr0zGAEHOOHEUNjLcAXZ0siSN/DoTEbFkvkUXeW3ha8713bs7FSpWdA4hZgegX94/Li4uY9asWefecMMN3/qvZo4AIeK6U6dOG5YuXdooEEDkTQYUJKU8+OCDpt+EqkYEuj4QeXF/diSIX400Bw4caAq0mcDByAjDIgEGrbSQhX/zNovBwhUoFCPQ88u+z3sGwhxP+JGcirIwypTOGrF+9957r+Em/I5EgEJfEBIGG6TLcZnSPdABITFvvvGGqdiuZkd5jQCAtGrV6rM5c+ZcXL9+/b+UucwNIAzmxvHjx78SKJZIDVqQPZkc+mzXrVu3wJxEcvpwbxx+Q4YMMaEimJKNfybCk6/CYQLvvJUHAQtHID9DGQDyNwNS0lkPOIdCyFW/QMGfrE2fPn1MlXl0Q6pSkjKR34MmnFpjCoqj80Arhw8dCkrERkm//fbbuz/11FMLc3qXXAGyefPm8hdffPGO/fv3JzBIXsLulKpdQ+HfIlIafNLHkHNVfVAORlhhTo4jOXrYXVQ3VT4U6R8kKBEcCQDx3Kr9WX4b0OR3gU726wO1oWbt5aDjd2hj/Pjxvohqme4V3qJ4N1kvbcuX6EiKvdE93NnGipVyLMUZMWKE89yzzxrfmMJK2DDRRaFH+qnAWaA3fscVkJ6a9ssXX3xx7t///vdfjwsgxGb16NHj3nnz5j2Asm4cMNzQW+Vc8UsQPGY+sdLzzz/fWbhwoYn8zA0Q9s6uuH3j7POGVStEQc4fwtAJG0DHYUJR9uBYnOcK/yNf+2Qn1uIYfyCAKExHWY4QJ7Fcjz32mO915Q9RKExOFVxsj79AZDZpx+1ERkQ6GzZuMOH5O3fu9OhA1FD2divmQUaycLk8PRoPHPB0ts3MdHfu1HnG4sWL71TsVbA6iDnvjTfeqN21a9dvypcvHyOiNUj0ZpIpXkfcArmTgaCU4TxUzSd/86ztRJQcKoVeP+1e3QTGERSpImw8X/pIoPYBxUE0J9MzAwFEAZEAQ6Vr2eTIJcJfAhj89VTRlx3Krs/8JZDUdE+OD1xp4kMP+ZoL0WxI3MIE3GZlGdM/GyvKO1zlyOHDaf995b+X3XjjjWtyW7NcRSzvBREXXHDBC1988cUtkvFF9AqF1ufoIlLMyCHA5IsiJlYn1OckYtkV1OEOtoOJKo4odwyMgQJU8qkpY284VBkHKVY8BgKIIqPlLkDvQP+AHh5//HFj3UIyYUOUuA6NKd9eorzi/zRYgQcRi/yeK664wtyXz5UMJX0UTiLxXXFYAK7OGXUWJK1Y2Vuh7ccrYpnzZ8yYccngwYPfj42NjdBLSWewA/0ADH+LeAk5QN407M1rp1YQoP+L2MFmKFhqezZp0iQTjcs9mWC1HgAkAqYTlkfl52IlnZPj4YEAwtqzsan2FKIWmylrzGckrpHmixTCulatWvVPE+dv6eJ+yh03xB4V5Yy6a5Qz5bHHnGrVqzu//vKLE62ejcdMSof523Y9mKSpo0ePjR83vsvYsWOX57VSgTgIPS/KNWvW7MOdO3c2AeEiYG7K7+wESppRLgZAYKAU7MLLauscNgexB690TT5jt3j99ddNPA335h4k33OITStttkxJL14gBgMQVSsUSHhjcRL6mlAdp02bNmYgSoDz5xh8B5Erwlhi2aavv3ZaX9jaiPPQVuqxYz4lXVmD6CMc+EYAIvepUaPG8mWr11zf+PTTPQ0eczkCAoTr7rvvvp6PPvroS+np6S7YoXZwtSNDtBJL5EXxRSA20TZ53Lhxvm5Legc7yUWfyfuOYs7uQs+LTZs2+QLh2HlUD0rPNT0VyxhIsSIkEEBsEQuAyGwPHUHk0An574hbuAdsRV1gkQ7LJso1+pvNc/iIEc7Mmc8b5zDKN4q4zP1wF0AjgMR6XQMUZhgyaPCNU6dOfc3fc+4/mUEBZMeOHQmtW7fevXv37lheDgI1FiRvopG4AqzLmNCysgxIEIso74/lgP/aISB0uBEDkVLOuar3hDWCEHoBTdmByjvn/ka3obZRmYhVrAAhMCOvPUpFEsT5eVkZWGxOgiOR/9CF1psNEEDI287fylikmxcJcZQsiitfzpeHzvdEcfsOl8vXV9J87rFk7XrrjTfPu/jii/cFmrygAMJNxowZM2zixIlT+V2hJYbNuTxezJzEKIBDVW0KO0RHRf/FeWiqS0RHGTs2A0Yse37m884/+/c3Paq3//BDwFCBQAMs+z6EZ8DtMb+SQ0L+OH0eMefTT5DsRZl2Fe8HcBShC+CI/6M5kayi/ikW0J+UfIW/oBKPHDnypkcffXR+IO7BzAUNkK1bt8afc845u2JiYuIRh3zVFrM8dbNyAwif0yoBKwOxMqlpHq83gWUcaememqjE8n/z7TemlRiWLGRJQtdVlSSEl7ns1fIxA1ERkb68ERzA1A0gfULWT6VHw4m0ifK4GTNmOMOHD/eVEs2L/pQRC+c6fPjwVx988MHFF154ocVmch9A0ADhFsOGDbvuiSeemFehQoUwVcq2Xf05IRiPZcOzznLeX77cSahY0SkXV86AAo6iIyMzwzh7buxxo0lykTwZKNAsH+tSdmmIzAA6DCKzkq6omjJ37lyf6C3/h5zGbJikVKPUE10h31huAJEY7xXXM2677bZ2zz///EfBDv+4ALJv377yjRo1Wrt3796z8HGQA0CwYF4cRMGDt/fv7zz37HM+cJABppcHLG+8+YbTrWtXp0rVqiafA9OcLBPBDqbsvBI4A9meUBQkEsQqfBmLFi0ylXJsy6b8aHADQo4oxiB/R170p+u8Fq3XN27c2LNOnToes1YQx3EBhPtNmTLl4pEjR75ftWrVKFheIIAowR9iX5mU5LRu1co4FBMqJhiwKFqXChlrVq82dm28oBxl+RxBrGAJP6VcbJzRKzikJ1DOltoC6LgqEapcE4w3N9xwgznfWKu8fpa8OAj6ysGDB9PGjRt30f3337/ueKbsuAGyffv26N69e89atWpVD1Op0JuPkdsLmgFQ+zQ21jnjjDOclStXGg+7TL0o6E9Of9IZNnSoT7SCe9BxFLD4l9w5nsGVnRv6M0A0LfqGmjSZWKmDB43Zd9iwYcY6BYFDR5RugrOoiLg88IE4CJtzvXr1/vvuu+/2ySmkPa9ZOm6AcLMlS5b8rUuXLl+FhYXFBNJBjJnv6FHFvjgStSiyUKtGTWfXT7udjh06OF9v2mQCyOA4SpWFk5TpIaFP5Pl5QyVc2aFLiFGEK2HcOfXUUw1nASgDBgwwnncOAANwjC8sDyORtwZW1tNPP31ur169ko/3XU8IIFi/rr322gcXLVp0TyARy1ghUlONFxOZksFPmzbNGThgoKlAMWXqVGfsv//t86kYr6tXxLKjMY93YGXnl4wZkBWLt1XtZBUrJMyIegMQOdmj//rXv8ygsHah/+rICyB816pVqxc+/PDD/sGYdf1n7UQBQuh5xSuuuGJjSuqxU+EQ8RUq+EJOVEDOVOqjUaQ3u0uiFuwUGfOCFhc41apXMywW8JgYm2xT8dFwE6VoloylLnvLE5kBd5ZnvTnsgnRSrglKTUpKMnntcA0VEZHVy1sR0YjiCj/ylhE1DsnMzMwD77zzToNgnII5vf8JA4SbTZgw4aKx949dXqNmzSjyv6U7oFybHiNeTmCHHcMhcP336NnTdDuif5yCGRVaoMkKpuzQiSxK2TUhNAPZf6qR4GuPLYCQhYg5F3FLWYp8R9iKwAIgAAdhK/LYI5rt2rUr65577uk2ceLEt090xPkCSHJycuSAQQMmrUpaNSy+QgUXaY6Ef2DaJS4GxRyHn4BDphfsE5c/3yFbMkglVtmBjEr1LYrSlSc6eWXX5X8GcorlsunBzhdSxU6FJckBCK0QhYFVlcPLXdxNmzadMX/+/FHHq5jbo8oXQLjRihUrqnW++ur3IiMjzlGsDKDgqJiQYEy6mOvQQwCP0A6ACB47RmlQb4CZJkaplf6hzvlfjrI7hNoMUPSBQ2su6UE/JVUotg9aUpoFXMPEXh09ajiP0nbhLikpKdvnzZvXulu3bj/nZ8z5BggPnzhxYtsx941ZVq58+UgFisnRxyB4efQUHfKUo7gryUqKVn4GU3ZtyZuBnACiUciiCcewA1dVEhfa0ibKOYDHOKZ/+y37wQcfvGTMmDEf53dGCgQg+Gy6dO3y77fefOvf/I7Cbjq9euPwlUSPSAUnkciFIs6gTEqk1+GjAYubBKqqkt8JKLu+eGcAgNjc40/ijcvDXaSAQ1PyfUAfiteCc8BJvFmL2Z07d75r8eLFj5+I1cp/NgoKIA5VUK7s1CFpx487zqMu1u8H/8hDQbSys8qU7EKcVk7leaR3KBqzeJew7OmFOgOWkm7H8okGtEGqkglWK/WusQNZladUp06d91955ZUurVq18kTF5vMoMIDwHi/MeaH5bb1vW0WwLpYrEM7ATK3erCyT6SWugn7iA5G3HJAsF5JJ7Z/5HGfZ5SE6A24A4nX02aKVLUGoaqbdl0btyuEuphCDp4b0gZkzZzbt16/fjoIaboECBPfFzTffPPTVV199JD4+PozMQCW/CO0g3ZQIxRNKAxtv+HtBDajsPqVrBgAF7gLCjkwVdq8uy2YLuPjOG6+V3atXr86zZ89eVpAzUNAAwfYc06FDh4k//PDD0MjISBe2aaXjolSRiQgrFUssK9tTkMtZ+u6F5KE6u4wO94B0FqQR2h2w2datW/fJjRs3jrR7exTEbBQ4QHipbdu2VWjatOnClJSUdmrQrgp5iFEoW5Ily8r2FMQylu57mDgtrFTe6Aq4BhyEIz01jao332zZsqVlpUqVPGHBBXgUCkB4v7fffrvOtddeuy4iIiIReVJ1kVRTF5GLcj4HD/m6XRXgsMpuVVpmQOCI8OaqI2Jh9DFpuBRxCAs/snjx4sYdOnT4sTDGXGgA4WUfeuihVg8++OD7qampcZQiJRkGYGDlUkYi/R3KjrIZyG0GVPxNvjOAQskgGiaFhYenPDr5kYuGDx++vrBmsFABQvzZyJEju02ZMmVuVFRUFNYG8s19le+ys0119rKjbAbyAgjilOlHmZLiq7ebnZWVet+Y+66eMGHCisKcvcIGCO8e0adPn35z5sx5IjIyMgodhKIP/DQteMs4SGGub4m/tzIJlUDn9Yuk9evT95bnnnuOlgV/jnYs4BEXBUAo6RLdt2/f4StXrpxQqVKlMEKYOZAv6RBUdpTNQG4zwEZqWus5jlOpcmWaI7k7XNlh2NKlS5/GyV7YM1ckAPEOIuLCCy8csnr16smJiYnhRGISh4UVSzV/jVPRGyLPNcZP4m2OU9gTUXb/4pkB4wTEt+Fyedq4ZWYaJdxbP9eEJbGRetupudu1u+y+e0ff+0jbtm0LHRzMSFEChOdFNW7c+N+bNm26p2rVqmGYew8dPuSJ6iUC2O02Nm9EL8Nl3O6ylNviodsie6oa3KjGs6+eLhsldZojItQ511237hlTvvv2u3uKgnNoAooaIEayql+//oht27aNj4iICEcHIYsQT6nxkXg5Bn+zo5QVjisyWi2WB6ldmh7OZokjkM2TAw5zLCXF3aDhWWO/TU5+hC7jRfmixQEQM+46derc8+OPP46Jr1ghzHjXvam2sFpfoxx6EAboUlqUk1X2rIKfAdNX5sgRs8763RBIbKx5WOqxY+5mzZs98Nnazx4qaC95MKMpLoA4W7dujerVq9d9q9esHpOQmOjC085EIXPCORRzUwaQYJax5J6DiCUw2P0ITefi7GynVavWj67+6CPEqj+S14twuMUGEMZIyu7wkSPHLFv27hgCHU3a5K+eXopE+ypuqwjno+xRRTwDAMSO7K5Rs6bpb+8KCzvW/frrxr36yqtTigscxaGk/2X6MQEPGDRo4NKlSybRxQpnEPoHTkX6nZdxkCKm2CJ+HADBO67EOcJHIqIi9/XoefPNc2bNovtTsXCO4lTSc1qCiEGDBnV96umn/q9CxYqxsFqAws6ispRFvG5ljyuiGVCsFaI1uR2ZGRlH7xp1V9vJkycfV4nQwnrdYhWx/AblGj9+fIuJEye+n56eXl5FxBTarIY7sm7wNy5UimCXHcU4AwEa6MjHpZ+sm1qpmRRsb/dbb1Olo6NHjz7/vvvu+64YR/SnR4cSQMyLLVq06PRbbrllRnp6eqfo6OgwVUoRMFQbCeCUeeKLn4yCacGm1mlEdQMEDoWQUNyNhjnR0dHvvPXWW33bt2/vqd0TIkfIAYR5Wbt2bfz1119/5+7du8cmJiaGUWYSHwl6id1hiN/L8kmKl5ICAQSxiWLlWKWI4LbTHcwGl5Hhbty48bjXXnttcn7qVxXWLIQkQLyDjezcuXPfJUuWTKlRo0YcnnayEzlg0+gp+EuoLl92FN8MBAKItwyPeUG4BZZJ1s7bxi+9e/fu/5w/f/7c4vBxBDNroQwQ3j9swoQJ5z3zzDOv7tmzp05sbKxL/erkbS0Llw9mmQvvnEAAgYPgAAQUWKq8/WDcZ5555vdDhw7tPmDAgK8K7+3yf+dQB4gZ4YIFC6o8/PDDz2zYsKFbhQoVXLBqse7fDh7I/yyU3eGEZyAYgCBK0feD+LqMjIysrl27PjRq1KhJBVWa54RfPogLSwRAvOMIu/322y+ZOXMmnXbPqVq1qotarGUcJIhVLsRTggGIt3NUdtWqVTcNHTp04JgxY1YXdh5HQQ25JAHEjHnp0qVVxo4dO/Dzzz8fExMTE5GeWaSxawU176XmPoEAQnr1gQMH0lu0aDH2oYceevbyyy83BaxKylHiAMLEJiUlhb/55pvNp0+fPjfLnX2GLzsxM9MUqMPphK6CQmiKknlLWOp3X1uFsnD6gHSqPoDKDdcFqjBChyj5rGTCtSpjusuXL7+FvuRjxowhb7zEOa1KJEC0SElJSdHDRw4fu337jyN///33SC2UnXSlPocoiMqFNyH1LpexpJSF0+eNEQGDTQcTLbof5nWirwkRyUz/g4NT6wyFHNE3IiLi6KWXXjro9ttvf6l79+7FGi4ScBfI44QSDRDvuFzjJ02q+5+npo//afdP14VHRESxg2ECBjCYh7Gc/GkH9GavldX+DUw6Ps+318HHFWT8iUvEePvdm6w/j/EktUmTJs8OHz784VtuuSWknH6BR/vXM0oDQMyoCJ+f8eyMc+bMfmnKgQO/XRgRGRmmXGbCqUnMQeSyk/9J7ywLhgzMQUhigtvSfRbOwZypj6CT7VZXp+z4+Pj/TZgwYejQoUO/CVW/xvGCpNQAxBK7yj3zzDNXrkxa+dyBgwcr46hiZ5PYxeKiOCIvHzl8uAwgASgG5x61A9QUCbFK3nByduJi4xBdf+3Tp89No0aNWl2zZk1P96RScpQ6gNhAmTlr5oBFi14fdywlJRalErAQ26VkLDhLmQ6SNyWbYNHsbCNWUQkThx8FFNDhatSosf+G7tf3veWWW5aef/75pbI8TakFiPST91avrvL63Lld589/9d7f9u8/DRGaaiksvKJKS8lmVyjDQLdAnELngBO7s7OzKlepnNz71t539+jRY3lpBYYms7QDxEc0GzduTJg9e/ZFC19fOGjHjzsuJ4yFL8t0kMA6iNepl9bgrIaLbul58xN9+/bdVNpEqdxm4aQBiCaADMbly5efMXfu3JuSkpKGOo5TXg0gZdWy63QhkvG5mrfY7eKMf4V/3gZAnCO/AaKIKUThbVCqDkn+DUrtVtd2hyVjLXK5TJ0o1YziM7tdmekjn+GRbOz762/1mbcbE9kdm/gcEZN78u4o4nzGmE2Pe8dxR0REfHfllVc+2K9fv/e6du26v7gz/AqFTeZx05MOIPZc0DZu0qRJ12zatGna+vXrEzMzM10QCLoK4hf2frWL829HLUKNijEhft+r0AAAA0NJREFU2x5C9vFll/G5mL553qJodls5fuc5pmqgfV0OC6Xn63n+PRujIiLNVQKaes6r56N/4pn/I7DucZi+9l5QhIeH/9qmTZsnWrZsubB9+/bbiqpIW1ETfzDPO6kBogmi6U9SUtKZS5Ys6fm///2v6+7du+sQVa8iZiJOcQj+Nm3lvMW3+VyEzGcQve1gM36Y7GzjZPNvN4aIZ4NHXEI//T3YKMv28zLSPNU/7EPf+3MVcTrO1Tt53wsP948NGzZ8p3Pnzi9de+21m1q1akVhqpM+l6AMIH/eRlzJyclxn376ac3ly5d3Tk5OHrB58+a6qamp4TYRKv2XS1V824heAMB7YA6Fg9ilUyWqiXA5VZ1abeK1xTCUZB+4vJzCJvDI8AgjInEIwPwOGPlvcmays8Ud/ni/iIiMyMjI7+vVq/fyJZdcsrRz585bO3bsWOANaILZpUP5nDKA5L46rl9++SV27dq15Tdv3lx/zZo17b744ot/7ty5s0Z2drZR8M0R9oe4JDFHeoqPG6hJpVdXMQTt/QyOwJGTCGeutwrq2QDQM4iF4nNAKy4G6GS+BoxeAGXHxMQcPeWUUz4677zzXmrRosXqxo0b72vfvj1+i5OeU+RGBmUACX77cm3fvj3qyy+/PH3dunXd1q1bd8+2bdvid+7e5TLVODIzfU3tbcVbO7gUYf62d3ibW9ivIo5i6ysCnLiZeU6WR6QTFxHY4uPj3bGxsdm1atU6UL9+/adbtGixoGHDhtuuuuoqRKcSGxsV/HIVzJllADnxeQz7/fffK2zatKnajz/+WGdT8qb2ycnfdPxxx45T9+/bF3HkyBFXampqWHp6elhWZiZswuX9b0zLcsARBGjrA4YpeRV4u1ax6TXvr2tERLjDHFdW+fLlD1WpUuWHU045ZWO9evWWNWjQYF2dOnV+7N69e1kuwImvr4ezu91uFq7syN8MMIeAgHZZ4fv27Qvftm1b1K79+2N3b91a+cDhw6f+/NNPf9uzZ3fLffv230B7bPLrCaRUMKV0Bl7DVrKxMhElixc7ISFhY2Jiwhc1atb48LRap22rUaPGd7Vq1TpSp06d1Pr162NGk6hUJjLlbz19V/8/ETpIrLIrPxwAAAAASUVORK5CYII="
                alt="login icon"
              />
              {/* <div className="login-container"></div> */}
            </section>
            <div className="input-container-name">
              <input
                className="form-input"
                id="email"
                type="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
                required
                placeholder="Email"
              />
            </div>
            <div className="input-container-password">
              <input
                className="form-input"
                type="password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
                required
                placeholder="Password"
              />
            </div>
            <button className="login-bttn" type="submit">
              Login
            </button>
            <p id="login-error">{loginError}</p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
