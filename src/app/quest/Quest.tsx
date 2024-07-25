import ClientQuestListContainer from "@/components/QuestContainer/ClientQuestListContainer";

export default function Quest() {
  return (
    <div>
      <ClientQuestListContainer
        containerTitle="Community Quests"
        containerDescription="Collect experience and items through open-source contribution"
        organizationName={"openguild-labs"}
      />
    </div>
  );
}
