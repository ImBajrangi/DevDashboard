/**
 * Synthetic Data Engine — Deep Void Archive
 * Rich mock data for all components when Supabase is unavailable or empty.
 */

const CATEGORIES = ['PAATH', 'BHAJAN', 'KIRTAN', 'KATHA', 'STUTI', 'LEELA', 'DARSHAN', 'SHLOKA'];
const AUTHORS = [
    'श्री कृपालु जी महाराज',
    'जगद्गुरु श्री कृपालु जी',
    'दामोदर दास',
    'ब्रज रस माधुरी',
    'श्री हरिदास जी',
    'सूरदास जी',
    'मीराबाई',
    'तुलसीदास जी',
    'रसखान',
    'कबीर दास जी',
];

const TAGS_POOL = [
    'Vrindavan', 'Radha', 'Krishna', 'Bhakti', 'Seva', 'Braj',
    'Leela', 'Darshan', 'Mandir', 'Prem', 'Gopi', 'Yamuna',
    'Govardhan', 'Raas', 'Madhurya', 'Vatsalya', 'Sakhi',
];

const IMAGES_POOL = [
    'https://images.unsplash.com/photo-1604608672516-f1b9b1d37076?auto=format&fit=crop&q=80&w=600',
    'https://images.unsplash.com/photo-1609619526458-5765a32cf5e3?auto=format&fit=crop&q=80&w=600',
    'https://images.unsplash.com/photo-1558618666-fcd25c85f82e?auto=format&fit=crop&q=80&w=600',
    'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&q=80&w=600',
    'https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?auto=format&fit=crop&q=80&w=600',
    'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=600',
];

function randomFrom(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
}

function randomTags() {
    const count = 2 + Math.floor(Math.random() * 3);
    const shuffled = [...TAGS_POOL].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
}

function randomDate(startYear = 2024, endYear = 2026) {
    const start = new Date(startYear, 0, 1).getTime();
    const end = new Date(endYear, 11, 31).getTime();
    return new Date(start + Math.random() * (end - start));
}

// ─── ARTICLES / CONTENT ENTRIES ───────────────────────────────────────────────
export const SYNTHETIC_ARTICLES = [
    {
        id: 'syn-001',
        title: 'वृन्दावन वैभव जितौ, तितौ कहौ नहीं जात',
        category: 'PAATH',
        author: 'श्री कृपालु जी महाराज',
        content_text: `"वृन्दावन वैभव जितौ, तितौ कहौ नहीं जात।"\n\nवृन्दावन की महिमा अपार है। यहाँ का रज-कण भी परम पवित्र है। श्री कृपालु जी महाराज कहते हैं कि वृन्दावन का वैभव इतना अद्भुत है कि उसका वर्णन शब्दों में करना संभव नहीं है।\n\nवृन्दावन वह धाम है जहाँ भगवान श्री कृष्ण ने अपनी लीलाएँ रचीं। यहाँ की हर गली, हर कुंज, हर वन में उनकी लीलाओं की सुगंध बसी हुई है।\n\nश्री राधा रानी की कृपा से ही कोई भक्त वृन्दावन का दर्शन कर पाता है। यह धाम सभी धामों में श्रेष्ठ है क्योंकि यहाँ भगवान ने माधुर्य रस की लीलाएँ की हैं।`,
        tags: ['Vrindavan', 'Braj', 'Leela', 'Krishna'],
        created_at: '2026-02-07T10:30:00Z',
        audio_url: null,
        images: [IMAGES_POOL[0]],
    },
    {
        id: 'syn-002',
        title: '"रोम रोम रसना जो होती, तऊ तेरे गुन न बखाने जात || "',
        category: 'BHAJAN',
        author: 'श्री कृपालु जी महाराज',
        content_text: `"रोम रोम रसना जो होती, तऊ तेरे गुन न बखाने जात ||"\n\nयह भजन श्री कृपालु जी महाराज द्वारा रचित है। इसमें भगवान की अनंत महिमा का वर्णन किया गया है। भक्त कहता है कि यदि शरीर का हर रोम एक जीभ बन जाए, तब भी प्रभु के गुणों का गान पूरा नहीं हो सकता।\n\nयह भजन हमें सिखाता है कि ईश्वर की महिमा अनंत है और हमारी बुद्धि सीमित। इसलिए विनम्रता से भक्ति करनी चाहिए।`,
        tags: ['Bhajan', 'Bhakti', 'Krishna', 'Prem'],
        created_at: '2026-02-07T09:00:00Z',
        audio_url: null,
        images: [],
    },
    {
        id: 'syn-003',
        title: 'दुर्लभानां च परमं दुर्लभं मोहनं',
        category: 'SHLOKA',
        author: 'जगद्गुरु श्री कृपालु जी',
        content_text: `दुर्लभानां च परमं दुर्लभं मोहनं\n\nइस श्लोक में बताया गया है कि भगवान श्री कृष्ण सबसे दुर्लभ हैं। संसार में अनेक दुर्लभ वस्तुएँ हैं, परन्तु सबसे दुर्लभ हैं श्री कृष्ण का प्रेम।\n\nमानव जीवन दुर्लभ है, उसमें भी भक्ति दुर्लभ है, और भक्ति में भी कृष्ण प्रेम सबसे अधिक दुर्लभ है।\n\nजगद्गुरु श्री कृपालु जी महाराज ने इस श्लोक की व्याख्या करते हुए कहा है कि केवल गुरु की कृपा से ही यह दुर्लभ प्रेम प्राप्त हो सकता है।`,
        tags: ['Shloka', 'Krishna', 'Prem', 'Bhakti'],
        created_at: '2026-02-07T08:00:00Z',
        audio_url: null,
        images: [],
    },
    {
        id: 'syn-004',
        title: 'तू तोह प्यारे ते भी प्यारी, बरसाने वारी',
        category: 'BHAJAN',
        author: 'ब्रज रस माधुरी',
        content_text: `तू तोह प्यारे ते भी प्यारी, बरसाने वारी\n\nयह भजन श्री राधा रानी की महिमा का गान करता है। बरसाना, जो राधा रानी का जन्मस्थान है, वहाँ की बेटी सबसे प्यारी है।\n\nश्री राधा रानी श्री कृष्ण से भी अधिक प्रिय हैं क्योंकि बिना राधा के कृष्ण अधूरे हैं। राधा-कृष्ण का प्रेम अनंत और अलौकिक है।\n\nबरसाना की गलियों में आज भी राधा रानी की उपस्थिति अनुभव की जा सकती है।`,
        tags: ['Radha', 'Barsana', 'Braj', 'Prem'],
        created_at: '2026-02-06T15:00:00Z',
        audio_url: null,
        images: [IMAGES_POOL[1]],
    },
    {
        id: 'syn-005',
        title: 'प्यारी तेरे नैना री अति बांके, ललित त्रिभंगी बिहारी नागर',
        category: 'KIRTAN',
        author: 'श्री हरिदास जी',
        content_text: `प्यारी तेरे नैना री अति बांके, ललित त्रिभंगी बिहारी नागर\n\nस्वामी हरिदास जी का यह पद निधिवन की रासलीला का वर्णन करता है। श्री कृष्ण का त्रिभंगी रूप अति मनोहर है — तीन स्थानों से मुड़ा हुआ, बांसुरी बजाते हुए।\n\nउनके नेत्र बांके हैं — टेढ़े और चंचल, जो गोपियों के हृदय को चुरा लेते हैं। यह पद माधुर्य रस से ओत-प्रोत है।`,
        tags: ['Kirtan', 'Krishna', 'Raas', 'Madhurya'],
        created_at: '2026-02-06T12:00:00Z',
        audio_url: null,
        images: [],
    },
    {
        id: 'syn-006',
        title: 'बसिवौ वृन्दाविपिन कौ, यह मन में धरी लेहु',
        category: 'PAATH',
        author: 'सूरदास जी',
        content_text: `बसिवौ वृन्दाविपिन कौ, यह मन में धरी लेहु, कीजै ऐसौ नेम दृढ़, या रज में परे देह।\n\nसूरदास जी का यह पद वृन्दावन में निवास करने की प्रेरणा देता है। कवि कहते हैं कि मन में यह संकल्प दृढ़ कर लो कि वृन्दावन में ही बसना है।\n\nऐसा नियम बना लो कि इसी धूल में शरीर गिरे। वृन्दावन की रज (धूल) भगवान के चरणों से पवित्र है।\n\nजो भक्त वृन्दावन में अंतिम समय बिताता है, उसे मोक्ष की प्राप्ति होती है।`,
        tags: ['Vrindavan', 'Bhakti', 'Seva', 'Braj'],
        created_at: '2026-02-05T10:00:00Z',
        audio_url: null,
        images: [IMAGES_POOL[2]],
    },
    {
        id: 'syn-007',
        title: 'श्री सेवक जी (दामोदर दास)',
        category: 'KATHA',
        author: 'दामोदर दास',
        content_text: `श्री सेवक जी (दामोदर दास)\n\nदामोदर दास जी वृन्दावन के एक प्रसिद्ध संत थे। उनकी भक्ति इतनी गहरी थी कि वे स्वयं को केवल "सेवक" कहते थे।\n\nउनका जीवन सेवा और समर्पण का प्रतीक था। प्रतिदिन प्रातःकाल से वे मंदिर की सेवा में लग जाते और संध्या तक भजन-कीर्तन करते।\n\nउनकी एक प्रसिद्ध उक्ति है: "जो सेवा में लीन है, वही सच्चा भक्त है।"`,
        tags: ['Seva', 'Bhakti', 'Vrindavan', 'Darshan'],
        created_at: '2026-02-04T14:00:00Z',
        audio_url: null,
        images: [],
    },
    {
        id: 'syn-008',
        title: 'हमारी लड़ैती साहिबिनी',
        category: 'BHAJAN',
        author: 'मीराबाई',
        content_text: `हमारी लड़ैती साहिबिनी\n\nमीराबाई का यह भजन श्री कृष्ण के प्रति उनके अनन्य प्रेम को व्यक्त करता है। मीरा कहती हैं कि प्रभु के साथ उनकी "लड़ाई" चलती रहती है — यह प्रेम की लड़ाई है।\n\nमीरा ने समाज की सभी बंधनों को तोड़कर कृष्ण को अपना पति माना। उनकी भक्ति में ऐसी शक्ति थी कि विष भी अमृत बन गया।\n\nयह भजन वात्सल्य और माधुर्य रस का अद्भुत मिश्रण है।`,
        tags: ['Bhajan', 'Prem', 'Krishna', 'Madhurya'],
        created_at: '2026-02-04T10:00:00Z',
        audio_url: null,
        images: [IMAGES_POOL[3]],
    },
    {
        id: 'syn-009',
        title: 'प्यारी जैसो तेरो आँखिन में, मैं हों अपनपों देखत',
        category: 'KIRTAN',
        author: 'श्री कृपालु जी महाराज',
        content_text: `'है चाह' कृपालु' मेरी, तेरी ही कहलाये,\nभूले भटके कबहूँ, तव सेवा मिल जाये ।'\n\n- जगद्गुरु श्री कृपालु जी महाराज, ब्रज रस माधुरी\n\nहे श्री राधा, मेरी यही इच्छा है कि मैं आपकी ही केवल कहलाऊँ, और भूले भटके देर से ही सही, मुझे आपकी सेवा प्राप्त हो जाए।`,
        tags: ['Kirtan', 'Radha', 'Prem', 'Sakhi'],
        created_at: '2026-02-03T16:00:00Z',
        audio_url: null,
        images: [],
    },
    {
        id: 'syn-010',
        title: 'यस्यास्तत्सुकुमार सुन्दर पदोन्मीलन्खेन्दुच्छटा',
        category: 'SHLOKA',
        author: 'जगद्गुरु श्री कृपालु जी',
        content_text: `यस्यास्तत्सुकुमार सुन्दर पदोन्मीलन्खेन्दुच्छटा\n\nयह संस्कृत श्लोक श्री राधा रानी के चरण कमलों की महिमा का वर्णन करता है। उनके कोमल और सुन्दर चरण चन्द्रमा की छटा को भी मात देते हैं।\n\nइस श्लोक में राधा रानी के दिव्य स्वरूप का अत्यंत सुन्दर वर्णन है।`,
        tags: ['Shloka', 'Radha', 'Darshan', 'Madhurya'],
        created_at: '2026-02-03T12:00:00Z',
        audio_url: null,
        images: [],
    },
    {
        id: 'syn-011',
        title: 'पुराना राधा वल्लभ मंदिर वृंदावन',
        category: 'DARSHAN',
        author: 'दामोदर दास',
        content_text: `पुराना राधा वल्लभ मंदिर वृंदावन\n\nयह मंदिर वृन्दावन के सबसे प्राचीन मंदिरों में से एक है। इसकी स्थापना गोस्वामी हित हरिवंश जी ने की थी।\n\nमंदिर में राधा रानी की मूर्ति नहीं है — केवल एक मुकुट रखा जाता है कृष्ण के बगल में, यह दर्शाते हुए कि राधा रानी का स्थान कृष्ण से भी ऊँचा है।\n\nयहाँ का वातावरण अत्यंत शांत और दिव्य है। प्रत्येक भक्त को अवश्य दर्शन करने चाहिए।`,
        tags: ['Darshan', 'Mandir', 'Vrindavan', 'Radha'],
        created_at: '2026-02-02T10:00:00Z',
        audio_url: null,
        images: [IMAGES_POOL[4]],
    },
    {
        id: 'syn-012',
        title: 'हम चाकर प्रीतम प्यारी के',
        category: 'BHAJAN',
        author: 'मीराबाई',
        content_text: `हम चाकर प्रीतम प्यारी के\n\nमीरा कहती हैं — मैं तो अपने प्रीतम (कृष्ण) की दासी हूँ। यह भजन पूर्ण समर्पण और शरणागति का भाव व्यक्त करता है।\n\nमीराबाई ने राजमहल का वैभव त्यागकर कृष्ण की भक्ति को चुना। उनका जीवन हमें सिखाता है कि सच्ची भक्ति में कोई बंधन नहीं होता।`,
        tags: ['Bhajan', 'Bhakti', 'Prem', 'Krishna'],
        created_at: '2026-02-01T14:00:00Z',
        audio_url: null,
        images: [],
    },
    {
        id: 'syn-013',
        title: 'दिव्य क्रीडा दर्शन, कुसुम सरोवर, श्री ब्रजधाम',
        category: 'LEELA',
        author: 'ब्रज रस माधुरी',
        content_text: `दिव्य क्रीडा दर्शन, कुसुम सरोवर, श्री ब्रजधाम\n\nकुसुम सरोवर गोवर्धन के पास स्थित एक अत्यंत पवित्र स्थान है। यहाँ राधा-कृष्ण की दिव्य क्रीडाएँ हुई थीं।\n\nइस सरोवर के चारों ओर सुन्दर वन है जहाँ गोपियाँ कृष्ण के साथ रास रचाती थीं। यहाँ का वातावरण आज भी उस दिव्य प्रेम की अनुभूति कराता है।\n\nकहते हैं कि चैत्र पूर्णिमा की रात यहाँ दिव्य संगीत सुनाई देता है।`,
        tags: ['Leela', 'Govardhan', 'Braj', 'Darshan'],
        created_at: '2026-01-30T10:00:00Z',
        audio_url: null,
        images: [IMAGES_POOL[5]],
    },
    {
        id: 'syn-014',
        title: 'अष्ट सिद्धि, नव निद्धि मुक्ति पद दें बौरावत दीख',
        category: 'STUTI',
        author: 'तुलसीदास जी',
        content_text: `अष्ट सिद्धि, नव निद्धि मुक्ति पद दें बौरावत दीख\n\nहनुमान चालीसा से यह पंक्ति बताती है कि हनुमान जी के पास आठ सिद्धियाँ और नौ निधियाँ हैं। वे इन्हें अपने भक्तों को प्रदान कर सकते हैं।\n\nपरन्तु मुक्ति का मार्ग केवल श्री राम की भक्ति से ही प्राप्त होता है। तुलसीदास जी कहते हैं कि सारे ऐश्वर्य भक्ति के आगे तुच्छ हैं।`,
        tags: ['Stuti', 'Bhakti', 'Seva'],
        created_at: '2026-01-28T10:00:00Z',
        audio_url: null,
        images: [],
    },
    {
        id: 'syn-015',
        title: 'जीव दशा कछु इक सुनी भाई',
        category: 'KATHA',
        author: 'कबीर दास जी',
        content_text: `जीव दशा कछु इक सुनी भाई\n\nकबीर दास जी का यह दोहा जीवन की क्षणभंगुरता का वर्णन करता है। कबीर कहते हैं कि इस संसार में कुछ भी स्थायी नहीं है।\n\nमानव जीवन अमूल्य है — इसे व्यर्थ की बातों में नष्ट नहीं करना चाहिए। भक्ति में लगना चाहिए, क्योंकि यही एकमात्र शाश्वत सत्य है।\n\nकबीर की वाणी आज भी उतनी ही प्रासंगिक है जितनी सैकड़ों वर्ष पहले थी।`,
        tags: ['Katha', 'Bhakti', 'Prem'],
        created_at: '2026-01-25T10:00:00Z',
        audio_url: null,
        images: [],
    },
    {
        id: 'syn-016',
        title: 'अहो लड़ैती प्राण प्यारी श्रीवन कबै बसावोगी',
        category: 'BHAJAN',
        author: 'श्री हरिदास जी',
        content_text: `अहो लड़ैती प्राण प्यारी श्रीवन कबै बसावोगी\n\nस्वामी हरिदास जी निधिवन के प्रसिद्ध संत थे। उनका यह भजन श्री राधा रानी से प्रार्थना है कि कब वे भक्त को अपने वन (वृन्दावन) में बसाएँगी।\n\nस्वामी हरिदास जी का मानना था कि सच्ची भक्ति केवल ब्रज में निवास करने से ही सम्भव है। उन्होंने अपना सम्पूर्ण जीवन निधिवन में बिताया।`,
        tags: ['Bhajan', 'Vrindavan', 'Radha', 'Seva'],
        created_at: '2026-01-22T10:00:00Z',
        audio_url: null,
        images: [],
    },
    {
        id: 'syn-017',
        title: 'गोवर्धन परिक्रमा — दिव्य अनुभव',
        category: 'DARSHAN',
        author: 'ब्रज रस माधुरी',
        content_text: `गोवर्धन परिक्रमा — दिव्य अनुभव\n\nगोवर्धन पर्वत की परिक्रमा 21 किलोमीटर की है। यह भक्तों के लिए अत्यंत पवित्र यात्रा है।\n\nश्री कृष्ण ने इस पर्वत को अपनी कनिष्ठिका अँगुली पर उठाया था। तभी से गोवर्धन को "गिरिराज" कहा जाता है — पर्वतों का राजा।\n\nपरिक्रमा करते समय भक्त गोवर्धन शिला के दर्शन करते हैं, राधा कुंड और श्याम कुंड में स्नान करते हैं, और दानघाटी में प्रार्थना करते हैं।\n\nकहते हैं कि जो भक्त सच्चे मन से परिक्रमा करता है, उसके सभी पापों का नाश होता है।`,
        tags: ['Govardhan', 'Darshan', 'Braj', 'Krishna'],
        created_at: '2026-01-20T10:00:00Z',
        audio_url: null,
        images: [IMAGES_POOL[0], IMAGES_POOL[2]],
    },
    {
        id: 'syn-018',
        title: 'यमुना तेरे अँग अँग में, श्री कृष्ण समाये हैं',
        category: 'STUTI',
        author: 'रसखान',
        content_text: `यमुना तेरे अँग अँग में, श्री कृष्ण समाये हैं\n\nरसखान का यह पद यमुना नदी की महिमा का गान करता है। यमुना जी कृष्ण की प्रिय नदी हैं — उनके जल में स्नान करने से सभी पापों का नाश होता है।\n\nवृन्दावन में यमुना के तट पर कृष्ण ने अनेक लीलाएँ रचीं। गोपियाँ यमुना तट पर ही कृष्ण की बांसुरी की ध्वनि सुनकर आकर्षित होती थीं।\n\nआज भी यमुना तट पर बैठकर ध्यान करने से एक अलौकिक शांति का अनुभव होता है।`,
        tags: ['Yamuna', 'Krishna', 'Vrindavan', 'Stuti'],
        created_at: '2026-01-18T10:00:00Z',
        audio_url: null,
        images: [IMAGES_POOL[1]],
    },
    {
        id: 'syn-019',
        title: 'निधिवन का रहस्य — रात्रि लीला',
        category: 'LEELA',
        author: 'श्री हरिदास जी',
        content_text: `निधिवन का रहस्य — रात्रि लीला\n\nनिधिवन वृन्दावन का सबसे रहस्यमय स्थान है। कहा जाता है कि आज भी यहाँ रात्रि में राधा-कृष्ण रासलीला करते हैं।\n\nसंध्या के बाद किसी को भी यहाँ जाने की अनुमति नहीं है। जो व्यक्ति रात में यहाँ रहता है, वह या तो पागल हो जाता है या अंधा।\n\nयहाँ के वृक्षों की विशेषता है कि वे जोड़ों में खड़े हैं — मानो गोपियाँ हों। प्रातःकाल यहाँ श्रृंगार की वस्तुएँ मिलती हैं — चूड़ियाँ, बिंदी, और पान के पत्ते।\n\nस्वामी हरिदास जी इसी निधिवन में रहकर भजन करते थे।`,
        tags: ['Leela', 'Vrindavan', 'Raas', 'Krishna'],
        created_at: '2026-01-15T10:00:00Z',
        audio_url: null,
        images: [IMAGES_POOL[3], IMAGES_POOL[5]],
    },
    {
        id: 'syn-020',
        title: 'ब्रज चौरासी कोस यात्रा — पूर्ण मार्गदर्शिका',
        category: 'DARSHAN',
        author: 'दामोदर दास',
        content_text: `ब्रज चौरासी कोस यात्रा — पूर्ण मार्गदर्शिका\n\nब्रज चौरासी कोस यात्रा भारत की सबसे प्राचीन और पवित्र परिक्रमाओं में से एक है। यह यात्रा लगभग 268 किलोमीटर की है।\n\nइस यात्रा में मथुरा, वृन्दावन, गोवर्धन, बरसाना, नंदगाँव, और ब्रज के अन्य पवित्र स्थलों का दर्शन किया जाता है।\n\nयात्रा का मार्ग:\n1. मथुरा — जन्मभूमि दर्शन\n2. वृन्दावन — बांके बिहारी, राधा वल्लभ\n3. गोवर्धन — गिरिराज परिक्रमा\n4. बरसाना — राधा रानी मंदिर\n5. नंदगाँव — नंद बाबा का गाँव\n\nपूर्ण यात्रा में 40-45 दिन लगते हैं। यह यात्रा वर्षा ऋतु के बाद शरद ऋतु में की जाती है।`,
        tags: ['Darshan', 'Braj', 'Govardhan', 'Vrindavan'],
        created_at: '2026-01-12T10:00:00Z',
        audio_url: null,
        images: [IMAGES_POOL[4], IMAGES_POOL[0], IMAGES_POOL[2]],
    },
];

// ─── HIERARCHY / RANKING USERS ────────────────────────────────────────────────
export const SYNTHETIC_USERS = [
    { pos: '001', name: 'V_REVENANT', weight: '142,880.04', status: 'OFFLINE' },
    { pos: '002', name: 'NULL_VECTOR', weight: '128,004.91', status: 'IDLE' },
    { pos: '003', name: 'USER_ALPHA', weight: '94,202.11', status: 'ACTIVE_LINK', isCurrentUser: true },
    { pos: '004', name: 'GHOST_SIGNAL', weight: '82,119.00', status: 'OFFLINE' },
    { pos: '005', name: 'STARK_VOID', weight: '77,402.15', status: 'OFFLINE' },
    { pos: '006', name: 'MONOLITH_X', weight: '64,001.22', status: 'OFFLINE' },
    { pos: '007', name: 'ECHO_DEPTH', weight: '58,442.10', status: 'IDLE' },
    { pos: '008', name: 'SIGMA_VOID', weight: '52,100.88', status: 'OFFLINE' },
    { pos: '009', name: 'DEEP_DIVE_0', weight: '48,200.33', status: 'OFFLINE' },
    { pos: '010', name: 'K_LEVEL_5', weight: '44,010.77', status: 'IDLE' },
];

// ─── NEXUS SIGNALS ────────────────────────────────────────────────────────────
export const SYNTHETIC_SIGNALS = [
    { date: '2026.03.01 // 04:22', title: 'QUANTUM_ENTROPY_LEAK', desc: 'Analyzing recent disturbances in the subnet-7 encryption layers...' },
    { date: '2026.02.28 // 21:15', title: 'NEURAL_DECAY_PROTOCOLS', desc: 'Understanding the limits of synthetic memory retention in long-void exposure.' },
    { date: '2026.02.27 // 09:44', title: 'THE_SILENT_SERVERS', desc: 'Mapping the decommissioned data centers in Sector 9.' },
];

// ─── STRATIFICATION OPERATORS ─────────────────────────────────────────────────
export const SYNTHETIC_OPERATORS = [
    { rank: '01', name: 'OPERATOR_NULL', kw: '4,821.11', uptime: '892D:04H:11M' },
    { rank: '02', name: 'S_PROTO_9', kw: '3,102.44', uptime: '741D:21H:30M' },
    { rank: '03', name: 'VOID_WALKER_X', kw: '2,994.00', uptime: '610D:02H:55M' },
    { rank: '04', name: 'OPERATOR_772', kw: '1,240.82', uptime: '428D:12H:04M', isYou: true },
    { rank: '05', name: 'K_LEVEL_5_109', kw: '1,188.00', uptime: '398D:08H:21M' },
    { rank: '06', name: 'GHOST_SIGNAL_22', kw: '1,176.00', uptime: '382D:14H:09M' },
    { rank: '07', name: 'V_ARCHIVE_1_743', kw: '1,164.00', uptime: '351D:03H:42M' },
    { rank: '08', name: 'ECHO_DEPTH_501', kw: '1,152.00', uptime: '320D:19H:15M' },
    { rank: '09', name: 'DEEP_DIVE_0_88', kw: '1,140.00', uptime: '299D:07H:33M' },
    { rank: '10', name: 'SIGMA_VOID_330', kw: '1,128.00', uptime: '278D:22H:50M' },
    { rank: '11', name: 'OMEGA_POINT_7', kw: '1,116.00', uptime: '250D:11H:04M' },
    { rank: '12', name: 'K_LEVEL_5_210', kw: '1,104.00', uptime: '229D:16H:18M' },
    { rank: '13', name: 'GHOST_SIGNAL_45', kw: '1,092.00', uptime: '208D:02H:41M' },
    { rank: '14', name: 'V_ARCHIVE_1_91', kw: '1,080.00', uptime: '187D:09H:55M' },
    { rank: '15', name: 'ECHO_DEPTH_604', kw: '1,068.00', uptime: '166D:14H:27M' },
    { rank: '16', name: 'DEEP_DIVE_0_42', kw: '1,056.00', uptime: '145D:20H:33M' },
    { rank: '17', name: 'SIGMA_VOID_71', kw: '1,044.00', uptime: '124D:05H:11M' },
    { rank: '18', name: 'OMEGA_POINT_2', kw: '1,032.00', uptime: '103D:12H:44M' },
    { rank: '19', name: 'K_LEVEL_5_333', kw: '1,020.00', uptime: '82D:18H:09M' },
    { rank: '20', name: 'GHOST_SIGNAL_99', kw: '1,008.00', uptime: '61D:23H:55M' },
];

// ─── ARCHIVE GRID IMAGES ─────────────────────────────────────────────────────
export const ARCHIVE_GRID_IMAGES = [
    'https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?auto=format&fit=crop&q=80&w=300',
    'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=300',
    'https://images.unsplash.com/photo-1464802686167-b939a6910659?auto=format&fit=crop&q=80&w=300',
    'https://images.unsplash.com/photo-1506318137071-a8e063b4bcc0?auto=format&fit=crop&q=80&w=300',
    'https://images.unsplash.com/photo-1462331940025-496dfbfc7564?auto=format&fit=crop&q=80&w=300',
    'https://images.unsplash.com/photo-1534796636912-3b95b3ab5986?auto=format&fit=crop&q=80&w=300',
    'https://images.unsplash.com/photo-1475274047050-1d0c0975c63e?auto=format&fit=crop&q=80&w=300',
    'https://images.unsplash.com/photo-1543722530-d2c3201371e7?auto=format&fit=crop&q=80&w=300',
    'https://images.unsplash.com/photo-1614728894747-a83421e2b9c9?auto=format&fit=crop&q=80&w=300',
    'https://images.unsplash.com/photo-1446776899648-aa78eefe8512?auto=format&fit=crop&q=80&w=300',
];

// ─── DOSSIER / PROFILE ───────────────────────────────────────────────────────
export const SYNTHETIC_PROFILE = {
    username: 'USER_ALPHA',
    designation: 'OPERATOR [TIER_02]',
    joinDate: '2024.01.15',
    totalWeight: '94,202.11',
    articlesRead: 142,
    streakDays: 38,
    lastActive: '2 HOURS AGO',
    topCategories: ['PAATH', 'BHAJAN', 'KIRTAN'],
};

export default SYNTHETIC_ARTICLES;
