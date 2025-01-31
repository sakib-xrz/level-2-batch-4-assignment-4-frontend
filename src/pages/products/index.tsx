import { useEffect, useState } from "react";
import Container from "../../components/shared/container";
import Filter from "./components/filter";
import { useNavigate, useSearchParams } from "react-router-dom";
import { generateQueryString } from "../../utils/constant";
import { useDebouncedCallback } from "use-debounce";

export default function Products() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const [params, setParams] = useState({
    minPrice: Number(searchParams.get("minPrice")) || 0,
    maxPrice: Number(searchParams.get("maxPrice")) || 0,
    brand: searchParams.get("brand") || null,
    category: searchParams.get("category") || null,
    sortBy: searchParams.get("sortBy") || "createdAt",
    sortOrder: searchParams.get("sortOrder") || "desc",
    page: Number(searchParams.get("page")) || 1,
    limit: Number(searchParams.get("limit")) || 10,
  });
  console.log(params);

  const updateURL = () => {
    const queryString = generateQueryString(params);
    console.log(queryString);

    navigate(`/products${queryString}`, { replace: true });
  };

  const debouncedUpdateURL = useDebouncedCallback(updateURL, 500);

  useEffect(() => {
    debouncedUpdateURL();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params]);

  return (
    <Container>
      <div className="flex gap-5">
        <div className="hidden w-52 lg:block">
          <Filter params={params} setParams={setParams} />
        </div>

        <div className="flex-1">
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ducimus
          suscipit nostrum odit minima in tempora? Cumque, impedit alias magnam
          odit modi quibusdam. Ratione facere omnis laboriosam accusantium
          laborum nobis, ullam, neque iure non, minima ex inventore cupiditate
          labore odit minus accusamus aspernatur! Corporis aliquid rem ea
          temporibus sint adipisci voluptas inventore eveniet amet alias
          consequuntur, ullam, magni nobis magnam laboriosam est odio commodi
          eaque ducimus architecto recusandae quo impedit aspernatur
          exercitationem. Consequatur quibusdam, laudantium error veniam
          veritatis cum excepturi recusandae iusto aut, fugiat odit aspernatur
          rem! Reiciendis optio veniam dolores hic animi libero magni alias
          dolor eveniet blanditiis officia illo, ipsum velit voluptate odit
          accusantium, repellat cupiditate. Animi ea ducimus ab aspernatur vitae
          rerum fuga quam, sunt autem laudantium ut illo! Velit accusamus fuga
          provident tenetur ullam, eum ipsum, dolore quo laboriosam sequi
          numquam, eveniet suscipit! Perferendis rem enim ipsa unde nostrum odio
          reprehenderit veritatis quae quaerat natus hic ea, ipsam consequatur
          illum molestias, obcaecati excepturi, commodi cum aliquid voluptas?
          Similique, temporibus repudiandae nobis non debitis expedita
          reiciendis. Corrupti inventore similique accusamus quasi! Nihil optio
          ab sunt minus exercitationem at, amet pariatur vel quasi! Minus
          corrupti ullam a ut culpa minima enim, deleniti rerum modi et unde
          magnam! Porro, aliquid aperiam dolorem esse, obcaecati eveniet
          perferendis vel labore sequi optio voluptas harum, illo eius fugiat
          nobis pariatur iusto exercitationem voluptatibus laudantium
          reprehenderit cupiditate molestias. Ducimus, doloremque laborum soluta
          officiis nobis sequi aliquid, minima odio molestiae sunt hic animi.
          Qui possimus illo impedit quia? Sint, numquam quos dolorum quas
          voluptate praesentium temporibus dolores soluta laudantium
          exercitationem vitae mollitia itaque nisi quidem voluptates provident
          sed aliquid doloremque rerum voluptatibus hic voluptas ad! Nisi
          soluta, minima fugiat voluptates minus omnis atque hic, obcaecati rem
          quasi nulla aliquid illum, debitis provident. Deleniti rem ducimus
          rerum, animi quidem fugiat consequuntur, aliquid, iure nihil minima
          labore eos officiis. Eligendi aut totam at sunt ipsa accusantium non
          laudantium fuga rerum pariatur ex voluptatem consequatur, aliquam sint
          repellendus, nobis tempora id. Possimus asperiores praesentium vero
          illo architecto, placeat debitis dolores quaerat ad libero ipsam sequi
          sint cumque veniam. Qui tenetur quis asperiores fugit enim nulla
          corporis et perspiciatis minus repellat animi, illum recusandae soluta
          ullam accusamus ad corrupti consequuntur nostrum expedita quia
          voluptates ipsa dolor. Qui incidunt optio tempora consequatur ullam
          iste voluptatum aperiam tenetur molestiae, debitis non exercitationem
          labore vitae cumque illum nisi in pariatur voluptas earum, veritatis
          itaque facilis id esse. Aperiam, dolorum. Incidunt id dolor laborum
          delectus dolorum, a enim doloribus ullam facere ad beatae ducimus
          aliquam est neque tenetur? Ipsum porro doloremque quam pariatur sed
          harum distinctio quas doloribus, quo at atque laboriosam, eaque nobis
          consectetur? Libero consequatur vitae earum numquam quaerat. Voluptas,
          quam aperiam? Ut ducimus placeat hic, rerum ex aliquam molestias optio
          impedit adipisci reprehenderit officia corporis commodi qui voluptatum
          similique aut vel odio sint consequuntur doloribus mollitia quis unde
          nesciunt! Illum ut libero distinctio praesentium, earum fuga voluptas
          veniam aperiam magni quaerat adipisci quam eius! Modi odit voluptas in
          incidunt eos debitis libero quibusdam quia, excepturi nesciunt eveniet
          accusamus quae asperiores?
        </div>
      </div>
    </Container>
  );
}
