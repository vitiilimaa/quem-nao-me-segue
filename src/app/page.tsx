"use client";

import { useEffect, useState } from "react";
import FileUploader from "@app/components/FileUploader";
import extractUsernames from "@app/utils/extractUsernames";
import Modal from "@app/components/Modal";
import Image from "next/image";

const HomePage = () => {
  const [followersHTMLs, setFollowersHTMLs] = useState<string[]>([]);
  const [followingHTMLs, setFollowingHTMLs] = useState<string[]>([]);
  const [unfollowers, setUnfollowers] = useState<string[] | null>(null);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleCompare = () => {
    const hasError = followersHTMLs.length === 0 || followingHTMLs.length === 0;

    if (hasError) {
      setUnfollowers(null);
      setErrorMessage("Faltam arquivos a serem selecionados.");

      return;
    } else {
      setErrorMessage("");
    }

    const followers = followersHTMLs.flatMap((html) => extractUsernames(html));
    const following = followingHTMLs.flatMap((html) => extractUsernames(html));

    const uniqueFollowers = Array.from(new Set(followers));
    const uniqueFollowing = Array.from(new Set(following));

    const notFollowingBack = uniqueFollowing.filter(
      (username) => !uniqueFollowers.includes(username)
    );

    setUnfollowers(notFollowingBack);
  };

  const handleReset = () => setUnfollowers(null);

  const handleHowToUse = () => setIsModalOpen(true);

  useEffect(() => {
    if (followersHTMLs.length > 0 && followingHTMLs.length > 0) {
      setErrorMessage("");
    }
  }, [followersHTMLs, followingHTMLs]);

  return (
    <div className="border-1 rounded-2xl overflow-hidden">
      <header className="p-4 flex items-center justify-between gap-5 w-[500px] max-w-[500px] ">
        <div className="flex items-center justify-between gap-3">
          <Image
            width={35}
            height={35}
            src="/logo.webp"
            alt="logo"
            className="object-contain"
          />
          <p className="text-[16px] font-semibold">Quem não me segue?</p>
        </div>

        <button
          className="bg-blue-600 text-white px-4 py-2 rounded-xl cursor-pointer hover:brightness-75 duration-100"
          onClick={handleHowToUse}
        >
          Como utilizar
        </button>
      </header>

      <main className="bg-gray-100 p-4 pb-4 flex-col w-[500px] max-w-[500px]">
        <div className="flex justify-between gap-4">
          <FileUploader
            id="followers"
            label="Seguidores"
            onFilesLoaded={setFollowersHTMLs}
          />
          <FileUploader
            id="following"
            label="Seguindo"
            onFilesLoaded={setFollowingHTMLs}
          />
        </div>

        <div className="flex justify-center items-center gap-1 mt-5">
          <div className="flex flex-col items-center justify-center gap-1">
            <button
              className="bg-blue-600 w-[150px] max-w-[150px] text-white px-4 py-2 rounded-xl cursor-pointer hover:brightness-75 duration-100"
              onClick={handleCompare}
            >
              Comparar
            </button>
            {errorMessage && <p className="text-red-500">{errorMessage}</p>}
          </div>

          {unfollowers && unfollowers.length > 0 && (
            <button
              className="bg-red-600 w-[150px] max-w-[150px] text-white px-4 py-2 rounded-xl cursor-pointer hover:brightness-75 duration-100"
              onClick={handleReset}
            >
              Limpar
            </button>
          )}
        </div>

        {unfollowers && (
          <div className="mt-6">
            <h2 className="text-xl font-semibold mb-2">
              Pessoas que você segue, mas possivelmente não te seguem:
            </h2>
            {unfollowers.length > 0 ? (
              <ul className="list-disc pl-5">
                {unfollowers.map((username, idx) => (
                  <li key={idx}>
                    <a
                      href={`https://www.instagram.com/${username}/`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-500 hover:underline"
                    >
                      @{username}
                    </a>
                  </li>
                ))}
              </ul>
            ) : (
              <p>Nenhum resultado encontrado.</p>
            )}
          </div>
        )}
        <Modal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          title="Como utilizar"
        >
          <ol className="list-decimal pl-5 space-y-2 text-gray-700">
            <li>
              <strong>Acesse o Instagram:</strong> Entre na sua conta pelo
              navegador ou aplicativo.
            </li>
            <li>
              <strong>Vá para Central de Contas:</strong> Clique no ícone de
              menu (≡) e acesse <em>&quot;Configurações&quot;</em>.
              Continuamente, clique em <em>&quot;Central de Contas&quot;</em> e
              depois <em>&quot;Suas informações e permissões&quot;</em>.
              Selecione a opção <em>&quot;Baixar suas informações&quot;</em>.
            </li>
            <li>
              <strong>Baixar dados:</strong> Clique em{" "}
              <em>&quot;Baixar ou transferir informações&quot;</em> e escolha a
              conta que serão importados os dados. Depois de selecionar a conta,
              clique em avançar.
            </li>
            <li>
              <strong>Quantas informações você quer?:</strong> Escolha a opção{" "}
              <em>&quot;Algumas das suas informações&quot;</em>. Entre as
              informações que podem ser selecionadas, escolha a opção{" "}
              <em>&quot;Seguidores e Seguindo&quot;</em> e clique em avançar.
            </li>
            <li>
              <strong>Escolha onde você quer receber as informações.</strong>
            </li>
            <li>
              <strong>Escolha o formato:</strong> Selecione o formato HTML e
              clique em <em>&quot;Criar arquivos&quot;</em>. Você deverá esperar
              um tempo até a solicitação ser concluída.
            </li>
            <li>
              <strong>Faça o download:</strong> Baixe o arquivo e extraia o
              conteúdo.
            </li>
            <li className="whitespace-break-spaces">
              <strong>Use no sistema:</strong> No sistema, para a seção de
              Seguidores, clique em <em>&quot;Importar arquivos&quot;</em> e
              selecione o arquivo que possui o nome similar a{" "}
              <em>&quot;followers.html&quot;</em> (se houver mais de um arquivo
              com o mesmo nome, importe todos). Posteriormente, na seção
              &quot;Seguindo&quot;, execute o mesmo procedimento, mas importando
              o arquivo <em>&quot;following.html&quot;</em>. Depois de
              selecionar os arquivos nas duas seções, clique em{" "}
              <em>&quot;Comparar&quot;</em>.
            </li>
          </ol>
          <p className="mt-4 font-bold">
            Pronto! Agora você pode analisar quem possivelmente não te segue.
          </p>
        </Modal>
      </main>
    </div>
  );
};

export default HomePage;
